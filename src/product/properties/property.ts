import {
  CollectionProperties,
  Expose,
} from '@forlagshuset/nestjs-mongoose-paginate'

export class Property extends CollectionProperties {
  @Expose({ sortable: true, default: true })
  readonly createdAt: 'ASC'

  @Expose({ filterable: true, default: true, name: 'category' })
  readonly category: 'Antique'

  readonly unsortable: string
}
