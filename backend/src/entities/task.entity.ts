import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    title: string

    @Column({ type: 'text' })
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'userId' })
    user: User
}