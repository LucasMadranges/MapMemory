package subType

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

func RegisterSubTypeRoutes(app *fiber.App, client *ent.Client) {
	app.Get("/subTypes", GetSubTypes(client))
	app.Get("/subTypes/:mainTypeId", GetSubTypesByMainTypeId(client))
	app.Post("/subTypes", CreateSubType(client))
}
