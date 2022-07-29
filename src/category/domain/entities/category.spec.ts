import { Category } from "./category";

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

    // expect(category.props).toMatchObject(props);
    // expect(category.name).toBe('Move');
    // expect(category.description).toBe('Descrição');
    // expect(category.is_active).toBeTruthy();
    // expect(category.created_at).toBe(props.created_at);
  })
});