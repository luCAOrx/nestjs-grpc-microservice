import { Entity } from '@core/domain/entities/entity';
import { Either, left, right } from '@core/domain/logic/either';
import { Name } from './Name';
import {
  NameValidation,
  IngredientsValidation,
  AvailabilityValidation,
  VolumeValidation,
  PriceValidation,
  ThumbnailValidation,
  OthersValidation,
} from './validations';

interface ProductProps {
  thumbnail: string;
  name: Name;
  price: number;
  ingredients: string;
  availability: boolean;
  volume: string;
  others?: string | null;
}

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  static create(
    props: ProductProps,
    id?: string,
  ): Either<
    | NameValidation
    | IngredientsValidation
    | AvailabilityValidation
    | VolumeValidation
    | PriceValidation
    | ThumbnailValidation
    | OthersValidation,
    Product
  > {
    // const nameValidation = new NameValidation().validate(props.name);
    const ingredientsValidation = new IngredientsValidation().validate(
      props.ingredients,
    );
    const availabilityValidation = new AvailabilityValidation().validate(
      props.availability,
    );
    const volumeValidation = new VolumeValidation().validate(props.volume);
    const priceValidation = new PriceValidation().validate(props.price);
    const thumbnailValidation = new ThumbnailValidation().validate(
      props.thumbnail,
    );
    const otherValidation = new OthersValidation().validate(`${props.others}`);

    const product = new Product(props, id);

    // if (!nameValidation) {
    //   return left(new NameValidation());
    // }

    if (!ingredientsValidation) {
      return left(new IngredientsValidation());
    }

    if (!availabilityValidation) {
      return left(new AvailabilityValidation());
    }

    if (!volumeValidation) {
      return left(new VolumeValidation());
    }

    if (!priceValidation) {
      return left(new PriceValidation());
    }

    if (!thumbnailValidation) {
      return left(new ThumbnailValidation());
    }

    if (!otherValidation) {
      return left(new OthersValidation());
    }

    return right(product);
  }
}
