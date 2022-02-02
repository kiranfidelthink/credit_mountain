import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ChildEntity } from './ChildEntity';
// import { AppointmentDetailEntity } from './AppointmentDetailEntity';

@Entity({ name: 'user' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name', nullable: true })
    public name: string;

    @Column({ name: 'email', nullable: false })
    public email: string;

    @Column({ name: 'password', nullable: false })
    public password: string;

    @OneToMany(() => ChildEntity, childtDetails => childtDetails.userDetails)
    public childtDetails: ChildEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
