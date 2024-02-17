import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { IsParkingEmptyDto, SetParkingDto } from "./dto/set-parkiong.dto";

export interface IZoneAttributes {
  id: number;
  zoneNumber: string;
  availableSpots: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ParkingZoneService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async findOne(id: number): Promise<IZoneAttributes> {
    const zone = await this.parkingZone.findUnique({ where: { id: id } });
    if (!zone) {
      throw new NotFoundException("Parking zone is not found");
    }
    return zone;
  }

  async createParking(zoneNumber: string) {
    const zone = await this.parkingZone.findUnique({
      where: { zoneNumber: zoneNumber },
    });

    if (zone) {
      throw new BadRequestException("Zone already exists");
    }

    const newParkingZone = await this.parkingZone.create({
      data: {
        zoneNumber: zoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return newParkingZone;
  }

  // Устанавливает статус парковки для конкретного места
  async setParkingStatus(
    setParkingDto: SetParkingDto
  ): Promise<IZoneAttributes> {
    const { zone_id, spotNum, isEmpty } = setParkingDto;

    const zone = await this.parkingZone.findUnique({
      where: { id: zone_id },
    });
    if (!zone) {
      throw new NotFoundException("Зона не найдена");
    }

    let availableSpots = BigInt(zone.availableSpots);

    // Обновляем status of parking_spot в зависимости от запроса
    if (isEmpty) {
      availableSpots = availableSpots & ~(1n << BigInt(spotNum));
    } else {
      availableSpots = availableSpots | (1n << BigInt(spotNum));
    }

    // Обновляем status of parking_spot в базе данных
    await this.parkingZone.update({
      where: { id: zone_id },
      data: { availableSpots: availableSpots.toString() },
    });

    return await this.parkingZone.findUnique({ where: { id: zone.id } });
  }

  // Проверяет, пусто ли указанное место на парковке
  async isParkingEmpty(isParkingEmptyDto: IsParkingEmptyDto): Promise<boolean> {
    const { zone_id, spotNum } = isParkingEmptyDto;

    const zone = await this.parkingZone.findUnique({
      where: { id: zone_id },
    });
    if (!zone) {
      throw new Error("Зона не найдена");
    }

    const availableSpots = BigInt(zone.availableSpots);

    // Проверяем, пусто ли указанное место
    return (availableSpots & (1n << BigInt(spotNum))) === 0n;
  }

  async deleteParking(zone_id: number) {
    await this.findOne(zone_id);

    const deletedParkingZone = await this.parkingZone.delete({
      where: { id: zone_id },
    });

    return deletedParkingZone;
  }
}
