import { Category, CategoryProperties } from "./category";
import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id";

describe("Category Tests", () => {

  test('Constructor of category', () => {
    let category = new Category({ name: 'Movie' });
    let props = { ...category.props };
    delete props.created_at;

    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    props.description = 'Test description';
    props.is_active = false;
    props.created_at = created_at;

    expect(props).toStrictEqual({
      name: 'Movie',
      description: 'Test description',
      is_active: false,
      created_at,
    });

    category = new Category({ name: 'Movie', description: 'Other description' });
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'Other description',
    });

    category = new Category({ name: 'Movie', is_active: true });
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    });

    category = new Category({ name: 'Movie', created_at: created_at });
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    });
  });

  test('id field', () => {

    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId()},
    ];

    data.forEach(item => {
      const category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId)
      if (item.id) expect(category.id).toBe(item.id);
    });
  });

  test('getter of name field', () => {
    const category = new Category({ name: 'Movie' });
    expect(category.name).toBe('Movie');
  });

  test('getter and setter of description field', () => {
    const category = new Category({ name: 'Movie' });
    expect(category.description).toBeNull();

    category['description'] = 'Test Description';
    expect(category.description).toBe('Test Description');

    category['description'] = 'Other Description';
    expect(category.description).toBe('Other Description');

    category['description'] = undefined;
    expect(category.description).toBeNull();

    category['description'] = null;
    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active field', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.is_active).toBeTruthy();

    category['is_active'] = true;
    expect(category.is_active).toBeTruthy();

    category['is_active'] = false;
    expect(category.is_active).toBeFalsy();
  });

  test('getter of created_at field', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.created_at).toBeInstanceOf(Date);
    const created_at = new Date();

    category = new Category({ name: 'Movie', created_at });
    expect(category.created_at).toBe(created_at);
  });

});