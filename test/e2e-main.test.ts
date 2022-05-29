import axios, { AxiosRequestConfig } from 'axios';
import { bootstrap, appClose } from '../src/main';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from '../src/types';
import Task from '../src/tasks/task.model';
import User from 'src/users/user.model';
import to from 'await-to-js';

interface AccessHeaders {
  headers: {
    Authorization: string;
  };
}

describe('Test /signup endpoint', (): void => {
  const port = 4002;
  const path = `http://localhost:${port}`;
  let headers: AccessHeaders;

  let userId: string;
  let boardId: string;
  let taskId: string;

  const testData = {
    name: 'test61',
    login: uuidv4().slice(0, 10),
    password: 'test',
  };

  beforeAll(async (): Promise<void> => {
    await bootstrap(port);
  });

  afterAll(async (): Promise<void> => {
    await User.delete(userId);
    await appClose();
  });

  it('should signup user', async (): Promise<void> => {
    const result = await axios.post(path + '/signup', testData);

    expect(result.status).toBe(201);
    expect(result.data.name).toEqual(testData.name);
    expect(result.data.login).toEqual(testData.login);

    userId = result.data.id;
  });

  it('should login user', async (): Promise<void> => {
    const result = await axios.post(path + '/login', {
      login: testData.login,
      password: testData.password,
    });

    expect(result.status).toBe(200);
    expect(result.data.access_token).toBeTruthy();
    expect(result.data.access_token.length).toBeGreaterThan(0);

    headers = {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
      },
    };
  });

  it('should create board then get and update it by id', async (): Promise<void> => {
    const result = await axios.post(
      path + '/boards',
      {
        title: 'testBoard',
      },
      headers,
    );
    expect(result.status).toBe(201);
    expect(result.data.title).toEqual('testBoard');

    boardId = result.data.board_id;

    const resultFromGet = await axios.get(path + '/boards/' + boardId, headers);

    expect(resultFromGet.status).toBe(200);
    expect(resultFromGet.data[0].title).toEqual('testBoard');

    const resultFromPut = await axios.put(
      path + '/boards/' + boardId,
      {
        title: 'testBoardUpdated',
      },
      headers,
    );

    expect(resultFromPut.status).toBe(200);
    expect(resultFromPut.data.title).toEqual('testBoardUpdated');
  });

  it('should create task then get and update it by id', async (): Promise<void> => {
    const result = await axios.post(
      path + '/boards/' + boardId + '/tasks/',
      {
        title: 'testTask',
        description: 'testTask',
      },
      headers,
    );
    expect(result.status).toBe(201);
    expect(result.data.title).toEqual('testTask');
    expect(result.data.description).toEqual('testTask');

    taskId = result.data.task_id;

    const resultFromGet = await axios.get(
      path + '/boards/' + boardId + '/tasks/' + taskId,
      headers,
    );

    expect(resultFromGet.status).toBe(200);
    expect(resultFromGet.data.title).toEqual('testTask');
    expect(resultFromGet.data.description).toEqual('testTask');
    expect(resultFromGet.data.status).toEqual(TaskStatus.TODO);
    expect(resultFromGet.data.user).toEqual(null);

    const resultFromPut = await axios.put(
      path + '/boards/' + boardId + '/tasks/' + taskId,
      {
        user: userId,
        status: TaskStatus.INPROGRESS,
      },
      headers,
    );

    expect(resultFromPut.status).toBe(201);
    expect(resultFromPut.data.status).toEqual(TaskStatus.INPROGRESS);
    expect(resultFromPut.data.user.id).toEqual(userId);
  });

  it('should delete board and cascade delete task', async (): Promise<void> => {
    const resultFromDelete = await axios.delete(
      path + '/boards/' + boardId,
      headers,
    );

    expect(resultFromDelete.status).toBe(204);

    const [err, task] = await to(Task.findOne({ task_id: taskId }));

    expect(task).toBeFalsy();
  });
});
