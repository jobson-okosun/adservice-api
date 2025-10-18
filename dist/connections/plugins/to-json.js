export default function toJSON(schema) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  });
}