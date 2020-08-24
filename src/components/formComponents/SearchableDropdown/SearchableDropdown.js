import React from 'react';
import PropTypes from 'prop-types';
import UpArrow from '../../../assets/images/svg/upArrow.svg'
import DownArrow from '../../../assets/images/svg/downArrow.svg';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  month: PropTypes.string,
  year: PropTypes.number,
  handleMoveOneMonth: PropTypes.func,
  handleOpenModal: PropTypes.func
};

class SearchableDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
      searchableValue: '',
      dropdownOption: ''
    };

    this.searchableDropdownRef = React.createRef();
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('click', this.handleDropdownClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDropdownClick);
  }

  inlineLabel = () => {
    return (this.props.inline) ? "searchable-dropdown-wrapper-inline" : "searchable-dropdown-wrapper";
  }

  selectDropdownOption = (item) => {
    this.setState({
      openDropdown: false,
      searchableValue: item,
      dropdownOption: item
    });
  }

  dropdownOptions = () => {
    if (this.state.dropdownOption === this.state.searchableValue) {
      return this.props.dropdownItems;
    }

    return this.props.dropdownItems.filter(item => {
      if (this.state.searchableValue === '') return item;
      if (item.toLowerCase().includes(this.state.searchableValue.toLowerCase())) return item;
    });
  }

  renderDropdownOptions = () => {
    if (this.state.openDropdown) {
      return ( 
        <div className='searchable-dropdown-items-wrapper'>
          { this.dropdownOptions().map((item, index) => {
            return <p key={ index } className='searchable-dropdown-item'>{ item }</p>;
          }) }
        </div>
      );
    }

    return null;
  }

  dropdownArrow = () => {
    if (this.state.openDropdown) {
      return <UpArrow className='searchable-dropdown-arrow-icon' />;
    }

    return <DownArrow className='searchable-dropdown-arrow-icon' />;
  }

  handleToggleOpenDropdown = () => {
    this.setState({ openDropdown: !this.state.openDropdown });
  }

  handleOpenDropdown = () => {
    this.setState({ openDropdown: true });
  }

  handleSearchableDropdownInput = (ev) => {
    this.setState({ searchableValue: ev.target.value });
  }

  handleDropdownClick = (ev) => {
    if (this.searchableDropdownRef && !this.searchableDropdownRef.current.contains(ev.target)) {
      this.setState({ openDropdown: false });
    }

    if (ev.target.nodeName === 'P' && this.searchableDropdownRef.current.contains(ev.target)) {
      this.selectDropdownOption(ev.target.innerText);
    }

    if ((ev.target.nodeName === 'BUTTON' || ev.target.nodeName === 'svg') && this.searchableDropdownRef.current.contains(ev.target)) {
      this.handleToggleOpenDropdown();
    }
  }

  // handleSearchableDropdownKeypress = (ev) => {
  //   if (ev.key === 'Enter') this.setState({ dropdownOption: })
  // }

  render() {
    return (
      <div className={ this.inlineLabel() } ref={ this.searchableDropdownRef }>
        <label className='searchable-dropdown-label'>{ this.props.label }</label>
        <div className="searchable-dropdown" style={ { width: this.props.width } }>
          <div className='searchable-dropdown-dropdown'>
            <input 
              className='searchable-dropdown-searchbar' 
              onChange={ this.handleSearchableDropdownInput }
              onClick={ this.handleOpenDropdown }
              onKeyPress={ this.handleSearchableDropdownKeypress }
              value={ this.state.searchableValue } 
              type="text" 
              placeholder={ this.props.placeholder }>
            </input>
            <button className="searchable-dropdown-button">{ this.dropdownArrow() }</button>
          </div>
          { this.renderDropdownOptions() }
        </div>
      </div>
    );  
  }
}

SearchableDropdown.propTypes = propTypes;
export default SearchableDropdown;