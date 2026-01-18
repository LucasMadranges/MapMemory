package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Memory struct {
	ent.Schema
}

func (Memory) Fields() []ent.Field {
	return []ent.Field{
		field.String("label").NotEmpty().MaxLen(25),
		field.String("description").NotEmpty().Default("").MaxLen(100),
		field.Float("price").Positive(),
		field.Time("created_at").
			Immutable().
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

func (Memory) Edges() []ent.Edge {
	return []ent.Edge{
		// 1 memory possède 1 maintype
		edge.To("main_type", MainType.Type).
			StorageKey(edge.Column("main_type_id")).
			Unique().
			Required(),
		// 1 memory possède 1 subtype
		edge.To("sub_type", SubType.Type).
			StorageKey(edge.Column("sub_type_id")).
			Unique().
			Required(),
	}
}
