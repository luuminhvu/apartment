import { ErrorResponse, SuccessResponse } from "../components/Response";
import { Amenity } from "../models/Amenity";
import { Area } from "../models/Area";
import { Building } from "../models/Building";
import { Floor } from "../models/Floor";
import { Room } from "../models/Room";
import { Request, Response } from "express";

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const areas = await Area.findAndCountAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Building,
          attributes: ["name"],
          include: [
            {
              model: Floor,
              attributes: ["floorNumber"],
              include: [
                {
                  model: Room,
                  attributes: [
                    "roomNumber",
                    "roomType",
                    "status",
                    "rentPrice",
                    "numberOfBedrooms",
                    "numberOfBathrooms",
                    "acreage",
                    "occupiedSlots",
                    "availableSpace",
                  ],
                  include: [
                    {
                      model: Amenity,
                      attributes: ["name"], // Chỉ lấy tên của tiện ích
                      through: {
                        attributes: [], // Không lấy các thuộc tính của bảng trung gian
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(areas.count / pageSize);

    SuccessResponse(
      res,
      {
        data: areas.rows,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: areas.count,
          totalPages: totalPages,
        },
      },
      "Areas fetched successfully"
    );
  } catch (error) {
    ErrorResponse(res, error);
  }
};
