package subType

import (
	"context"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/gofiber/fiber/v2"
)

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
// @Router /subType [post]
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

		// TODO : Vérifier le status de retour de l'api
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
