import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreditCardEntity } from './CreditCardEntity';
// import { AppointmentDetailEntity } from './AppointmentDetailEntity';

@Entity({ name: 'transactions' })
export class TransactionsEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'card_id', nullable: false })
    public cardId: number;

    @Column({ name: 'amount', nullable: false })
    public amount: number;

    @Column({ name: 'balance', nullable: false, default: null })
    public balance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => CreditCardEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
    public cardDetails: CreditCardEntity;

}
