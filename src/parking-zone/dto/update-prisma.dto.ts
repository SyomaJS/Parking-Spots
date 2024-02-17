import { PartialType } from "@nestjs/mapped-types";
import { SetParkingDto } from "./set-parkiong.dto";

export class UpdatePrismaDto extends PartialType(SetParkingDto) {}
