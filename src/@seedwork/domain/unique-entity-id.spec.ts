import uuidInvalidError from "../errors/uuid-invalid-error";
import UniqueEntityId from "./unique-entity-id";
import { validate as uuidValidate } from "uuid";

function validateSpyMethod()  {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe('UniqueEntityId Tests', () => {
  const validateSpy = validateSpyMethod();

  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('fake id'))
      .toThrow(new uuidInvalidError())
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept uuid passed in constructor', () => {
    const vo = new UniqueEntityId();
    const uuid = vo.id;
    expect(vo.id).toBe(uuid);
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });

});