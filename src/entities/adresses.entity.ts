import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  street: string;

  @Column({ length: 45 })
  zipCode: string;

  @Column({ length: 7 })
  number: string;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2 })
  state: string;
}

export default Address;
