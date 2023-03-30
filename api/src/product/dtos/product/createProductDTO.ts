import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDTO {
  // @IsNotEmpty()
  // thumbnail: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  name: string;

  @IsNotEmpty()
  // @IsNumber({ maxDecimalPlaces: 6 })
  price: number;

  @IsNotEmpty()
  @Length(2, 255)
  ingredients: string;

  @IsNotEmpty()
  // @IsBoolean()
  availability: boolean;

  @IsNotEmpty()
  @IsString({ context: [/\b[a-zA-Zà-úÀ-Ú]/, /(ml|mg)$/] })
  @Length(3, 5)
  volume: string;

  @Length(0, 255)
  others: string;
}
