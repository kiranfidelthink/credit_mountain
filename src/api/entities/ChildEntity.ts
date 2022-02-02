import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreditCardEntity } from './CreditCardEntity';
import { UserEntity } from './UserEntity';

@Entity({ name: 'child' })
export class ChildEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name', nullable: false })
    public name: string;

    @Column({ name: 'age', nullable: false })
    public age: number;

    @OneToMany(() => CreditCardEntity, creditDetails => creditDetails.childDetails)
    public creditDetails: CreditCardEntity[];

    @Column({ name: 'user_id', nullable: false })
    public userId: number;

    @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public userDetails: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
