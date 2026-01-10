package subType

import (
	"context"
	"strconv"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/ent/maintype"
	"github.com/LucasMadranges/MapMemory/ent/subtype"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/gofiber/fiber/v2"
)

// GetSubTypes godoc
// @Summary Get all subTypes
// @Description Retrieve a list of all sub types
// @Tags SubType
// @Produce json
// @Success 201 {object} request.SuccessGetAllRequest "Récupérer toutes les sous-catégories"
// @Failure 400 {object} request.ErrorRequest "Échec de la récupération des sous-catégories"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /subTypes [get]
func GetSubTypes(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		subType, err := client.SubType.Query().WithMainTypes().
			All(context.Background())

		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Échec de la récupération des sous-catégories",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessGetAllRequest{
			Success: true,
			Data:    subType,
		})
	}
}

// GetSubTypesByMainTypeId godoc
// @Summary Get all subTypes by main type ID
// @Description Retrieve a list of all sub types for a specific main type ID
// @Tags SubType
// @Produce json
// @Param mainTypeId path int true "MainType ID"
// @Success 200 {object} request.SuccessGetAllRequest "Récupérer toutes les sous-catégories d'une catégorie"
// @Failure 400 {object} request.ErrorRequest "ID invalide"
// @Failure 400 {object} request.ErrorRequest "Échec de la récupération des sous-catégories"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /subTypes/{mainTypeId} [get]
func GetSubTypesByMainTypeId(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		mainTypeId, err := strconv.Atoi(c.Params("mainTypeId"))
		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Échec de la récupération de l'id de la catégorie",
				Explicit: err.Error(),
			})
		}

		subType, err := client.SubType.
			Query().
			Where(subtype.HasMainTypesWith(maintype.ID(mainTypeId))).
			WithMainTypes().
			All(context.Background())

		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Échec de la récupération des sous-catégories",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessGetAllRequest{
			Success: true,
			Data:    subType,
		})
	}
}

// CreateSubType godoc
// @Summary Create subType
// @Description Create a new sub type
// @Tags SubType
// @Accept json
// @Produce json
// @Param subType body CreateSubTypeDto true "subType payload"
// @Success 201 {object} request.SuccessCreateRequest "Sous-catégorie créé avec succés"
// @Failure 400 {object} request.ErrorRequest "Corps de requête invalide"
// @Failure 400 {object} request.ErrorRequest "Données invalides"
// @Failure 409 {object} request.ErrorRequest "Sous-catégorie déjà existante"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /subTypes [post]
func CreateSubType(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body CreateSubTypeDto

		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
			})
		}

		if err := config.Validate.Struct(body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Données invalides",
				Explicit: err.Error(),
			})
		}

		subType, err := client.SubType.
			Create().
			SetName(body.Name).
			SetColor(body.Color).
			SetMainTypesID(body.MainTypeID).
			Save(context.Background())

		if err != nil {
			return c.Status(409).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "La sous-catégorie existe déjà",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessCreateRequest{
			Success: true,
			Data:    subType,
		})
	}
}
