import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ParkingZoneService } from "./parking-zone.service";
import { UpdatePrismaDto } from "./dto/update-prisma.dto";
import { IsParkingEmptyDto, SetParkingDto } from "./dto/set-parkiong.dto";
import { CreateParkingZoneDto } from "./dto/create-parking-zone.dto";

@Controller("parking-zone")
export class ParkingZoneController {
  constructor(private readonly parkingZoneService: ParkingZoneService) {}

  @Post("create")
  create(@Body() createParkingZoneDto: CreateParkingZoneDto) {
    return this.parkingZoneService.createParking(
      createParkingZoneDto.zoneNumber
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post("set-status")
  setParkingStatus(@Body() setParkingDto: SetParkingDto) {
    return this.parkingZoneService.setParkingStatus(setParkingDto);
  }

  @Post("is-empty")
  isParkingEmpty(@Body() isParkingEmptyDto: IsParkingEmptyDto) {
    return this.parkingZoneService.isParkingEmpty(isParkingEmptyDto);
  }

  @Delete("delete/:id")
  async deleteParking(@Param("id") id: string) {
    return this.parkingZoneService.deleteParking(+id);
  }
}
