import * as express from 'express';

import { RestDefault } from './default';
import { RestTodo } from './todo';

export class Rest {
	router: express.Router;

	constructor() {
		this.router = express.Router();
		this.config();
	}

	private config(): void {
		this.todo();
		this.default();
	}

	private todo(): void {
		let restTodo = new RestTodo();

		// List todos
		this.router.get('/todo', (
			request: express.Request,
			response: express.Response
		) => restTodo.list(request, response));

		// Create todo
		this.router.post('/todo', (
			request: express.Request,
			response: express.Response
		) => restTodo.create(request, response));

		// Find a todo
		this.router.get('/todo/:todo', (
			request: express.Request,
			response: express.Response
		) => restTodo.find(request, response));

		// Delete a todo
		this.router.put('/todo/:todo', (
			request: express.Request,
			response: express.Response
		) => restTodo.update(request, response));

		// Delete a todo
		this.router.delete('/todo/:todo', (
			request: express.Request,
			response: express.Response
		) => restTodo.remove(request, response));
	}

	private default(): void {
		// Default route
		let restDefault = new RestDefault();
		this.router.get('*', (
			request: express.Request,
			response: express.Response
		) => restDefault.request(request, response));
	}
}