import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 255})
    title: string

    @Column({type: 'text'})
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}