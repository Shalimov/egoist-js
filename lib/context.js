export class Context {
  constructor(current, parent, key, alias) {
    this.key = key
    this.alias = alias || key
    this.current = current
    this.parent = parent
  }

  static create(current, parent, key, alias) {
    return new Context(current, parent, key, alias)
  }

  static from(obj) {
    return this.create(obj.current, obj.parent, obj.key, obj.alias)
  }
}
