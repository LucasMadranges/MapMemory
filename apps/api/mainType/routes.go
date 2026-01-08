package subType

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

func RegisterSubTypeRoutes(app *fiber.App, client *ent.Client) {
	app.Post("/subType", CreateSubType(client))
}
