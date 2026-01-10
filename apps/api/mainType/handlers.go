package mainType

import (
	"context"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/gofiber/fiber/v2"
)

// GetMainTypes godoc
// @Summary Get all main types
// @Description Retrieve a list of all main types
// @Tags MainType
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
// @Tags MainType
// @Accept json
// @Produce json
// @Param mainType body CreateMainTypeDto true "mainType payload"
// @Success 201 {object} request.SuccessCreateRequest "Catégorie créé avec succés"
// @Failure 400 {object} request.ErrorRequest "Corps de requête invalide"
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

		if err := config.Validate.Struct(body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Données invalides",
				Explicit: err.Error(),
			})
		}

		mainType, err := client.MainType.
			Create().
			SetName(body.Name).
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
