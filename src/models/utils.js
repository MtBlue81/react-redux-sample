class EntityIdGenerator {
  constructor(name) {
    this.name = name;
    this.prefix = name + ':';
    this.prefixLength = this.prefix.length;
  }

  toEntityId(id) {
    return this.prefix + id;
  }

  parse(entityId, func = (id) => id) {
    const pos = entityId.indexOf(this.prefix);
    if (pos !== 0) return undefined;
    return func(entityId.slice(this.prefixLength));
  }
}

export {
  EntityIdGenerator,
};
