package mainType

import (
	"context"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/ent/maintype"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/LucasMadranges/MapMemory/utils/validation"
	"github.com/gofiber/fiber/v2"
)

// GetMainTypes godoc
// @Summary Get all main types
// @Description Retrieve a list of all main types
// @Tags MainTypes
// @Produce json
// @Success 201 {object} request.SuccessGetAllRequest "Récupérer toutes les catégories"
// @Failure 400 {object} request.ErrorRequest "Échec de la récupération des catégories"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /mainTypes [get]
func GetMainTypes(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		mainType, err := client.MainType.Query().WithSubTypes().All(context.Background())

		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Échec de la récupération des catégories",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessGetAllRequest{
			Success: true,
			Data:    mainType,
		})
	}
}

// CreateMainType godoc
// @Summary Create mainType
// @Description Create a new main type
// @Tags MainTypes
// @Accept json
// @Produce json
// @Param mainType body CreateMainTypeDto true "mainType payload"
// @Success 201 {object} request.SuccessCreateRequest "Catégorie créé avec succés"
// @Failure 400 {object} request.ErrorRequest "Corps de requête invalide"
// @Failure 400 {object} request.ErrorRequest "Couleur invalide"
// @Failure 400 {object} request.ErrorRequest "Données invalides"
// @Failure 409 {object} request.ErrorRequest "Catégorie déjà existante"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /mainTypes [post]
func CreateMainType(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body CreateMainTypeDto

		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
			})
		}

		if err := validation.ValidateColor(config.Validate); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Couleur invalide",
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

		mainType, err := client.MainType.
			Create().
			SetLabel(body.Label).
			SetColor(body.Color).
			Save(context.Background())

		if err != nil {
			return c.Status(409).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "La catégorie existe déjà",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessCreateRequest{
			Success: true,
			Data:    mainType,
		})
	}
}

// UpdateMainTypeByMainTypeId godoc
// @Summary Update mainType by mainTypeId
// @Description Update an existing main type by mainTypeId
// @Tags MainTypes
// @Accept json
// @Produce json
// @Param mainTypeId path int true "MainType ID"
// @Param mainType body UpdateMainTypeDto true "mainType payload"
// @Success 200 {object} request.SuccessUpdateRequest "Catégorie mise à jour avec succés"
// @Failure 400 {object} request.ErrorRequest "Corps de requête invalide"
// @Failure 400 {object} request.ErrorRequest "Données invalides"
// @Failure 404 {object} request.ErrorRequest "Catégorie non trouvée"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /mainTypes/{mainTypeId} [put]
func UpdateMainTypeByMainTypeId(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body UpdateMainTypeDto

		mainTypeId, err := c.ParamsInt("mainTypeId")
		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "ID invalide",
				Explicit: err.Error(),
			})
		}

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

		mainType, err := client.MainType.
			UpdateOneID(mainTypeId).
			SetLabel(body.Label).
			SetColor(body.Color).
			Save(context.Background())

		if err != nil {
			return c.Status(409).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "La catégorie n'existe pas",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessCreateRequest{
			Success: true,
			Data:    mainType,
		})
	}
}

// DeleteMainTypesById godoc
// @Summary Delete main type by id
// @Description Delete a main type by id
// @Tags MainTypes
// @Param mainTypeId path int true "Main Type ID"
// @Produce json
// @Success 200 {object} request.SuccessDeleteRequest "Catégorie supprimée avec succés"
// @Failure 400 {object} request.ErrorRequest "ID invalide"
// @Failure 404 {object} request.ErrorRequest "Catégorie non trouvée"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /mainTypes/{mainTypeId} [delete]
func DeleteMainTypesById(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		mainTypeId, err := c.ParamsInt("mainTypeId")
		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "ID invalide",
				Explicit: err.Error(),
			})
		}

		count, err := client.MainType.Delete().Where(maintype.IDEQ(mainTypeId)).Exec(context.Background())

		if err != nil {
			return c.Status(500).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Erreur lors de la suppression de la catégorie",
				Explicit: err.Error(),
			})
		}

		if count == 0 {
			return c.Status(404).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "La catégorie n'existe pas",
				Explicit: "No subtype found with the provided id",
			})
		}

		return c.Status(200).JSON(request.SuccessDeleteRequest{
			Success: true,
			Count:   count,
		})
	}
}
