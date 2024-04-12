import { Column, Entity } from 'typeorm';

@Entity()
export class Products {
  /** Java entity class
    private long id;
    private String sku;
    private String name;
    private String description;
    private Double price;
    private Boolean status;
     */

  @Column({ type: 'int', primary: true, generated: true })
  private id: number;
  @Column({ type: 'varchar', length: 255 })
  private sku: string;
  @Column({ type: 'varchar', length: 255 })
  private name: string;
  @Column({ type: 'varchar', length: 255 })
  private description: string;
  @Column({ type: 'double precision' })
  private price: number;
  @Column({ type: 'boolean' })
  private status: boolean;
}
