import { Component } from 'react';
import { BreedSelect } from './BreedSelect';
import { fetchDogByBreed } from '../API';
import { Dog } from './dogCard';

export class App extends Component {
  state = {
    dog: null,
    isLoading: false,
    error: null,
  };

  fetchDog = async breedId => {
    console.log(breedId);
    try {
      const fetchedDog = await fetchDogByBreed(breedId);
      this.setState({ dog: fetchedDog });
    } catch (error) {}
  };

  render() {
    const { dog, isLoading, error } = this.state;
    return (
      <>
        <BreedSelect onSelect={this.fetchDog} />
        {dog && <Dog dog={dog} />}
      </>
    );
  }
}
