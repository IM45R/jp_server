import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || '0909',
            database: process.env.DB_NAME || 'jp-database',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
        })
    ]
})
export class DatabaseModule {}