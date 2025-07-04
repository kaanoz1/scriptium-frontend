interface ICreatable<DTO, Instance> {
  createFromJSON(data: DTO): Instance;
}
