import { Component } from 'react';
import Select from 'react-select';
import { fetchBreeds } from '../API';

export class BreedSelect extends Component {
  abortCtrl;
  state = {
    breeds: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.abortCtrl = new AbortController();
      this.setState({ isLoading: true, error: null });
      const fetchdBreeds = await fetchBreeds(this.abortCtrl);
      this.setState({ breeds: fetchdBreeds });
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        this.setState({ error: 'ошибка!!!' });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.abortCtrl.abort();
  }

  render() {
    const { onSelect } = this.props;
    const { breeds, isLoading, error } = this.state;

    const options = breeds.map(breed => {
      return {
        value: breed.id,
        label: breed.name,
      };
    });

    return (
      <div>
        <Select
          options={options}
          isLoading={isLoading}
          onChange={option => onSelect(option.value)}
        />
        ;{error && <b>{error}</b>}
      </div>
    );
  }
}
