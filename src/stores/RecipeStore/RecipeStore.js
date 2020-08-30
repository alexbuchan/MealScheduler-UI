import Store from '../Store/Store';
import Constants from '../../constants/recipeConstants';

class RecipeStore extends Store {
  constructor() {
    super();

    this.recipesState = {
      recipes: [],
      ingredients: [
        { id: 1, name: 'ham', measure_unit_type_id: 1, measure_unit_type: 'weight' },
        { id: 2, name: 'cheese', measure_unit_type_id: 1, measure_unit_type: 'weight' },
        { id: 3, name: 'bread', measure_unit_type_id: 1, measure_unit_type: 'weight' },
        { id: 4, name: 'avocado', measure_unit_type_id: 1, measure_unit_type: 'weight' },
        { id: 5, name: 'water', measure_unit_type_id: 2, measure_unit_type: 'volume' }
      ],
      measureSystems: [
        { id: 1, name: 'metric', measure_units: [{ id: 1, name: 'grams', measure_unit_type: 'weight' }, { id: 1, name: 'kilograms', measure_unit_type: 'weight' }, { id: 2, name: 'liters', measure_unit_type: 'volume' }] },
        { id: 2, name: 'imperial',measure_units: [{ id: 1, name: 'stones', measure_unit_type: 'weight' }, { id: 2, name: 'pints', measure_unit_type: 'volume' }] },
        { id: 3, name: 'us customary', measure_units: [{ id: 1, name: 'ounces', measure_unit_type: 'weight' }, { id: 2, name: 'us cups', measure_unit_type: 'volume' }] },
      ]
    };
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.GET_RECIPES:
        this.getRecipesData(action.data);
        break;
    }
  }

  getRecipesData = (data) => {
    this.recipesState.recipes = data;
    this.emitChange();
  }

  getRecipesState = () => {
    return this.recipesState;
  }
}

export default new RecipeStore();