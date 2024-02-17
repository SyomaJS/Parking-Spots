import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class SetParkingDto {
  @IsNumber()
  @IsNotEmpty()
  zone_id: number;

  @IsNumber()
  @IsNotEmpty()
  spotNum: number;

  @IsBoolean()
  @IsNotEmpty()
  isEmpty: boolean;
}

export class IsParkingEmptyDto {
  @IsNumber()
  @IsNotEmpty()
  zone_id: number;

  @IsNumber()
  @IsNotEmpty()
  spotNum: number;
}
