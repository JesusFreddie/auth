import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function Start() {
	const _PORT = 5000;
	const app = await NestFactory.create(AppModule)
	app.listen(_PORT, () => {
		console.log(`Server started on port ${_PORT}`)
	})
}
Start();