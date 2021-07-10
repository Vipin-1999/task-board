import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Filter = ({ setColumns, columnsFromBackend }) => {
  const classes = useStyles();
  const [filterResult, setFilterResult] = useState('');
  const [filterQuery, setFilterQuery] = useState('title');

  useEffect(() => {
    setColumns(columnsFromBackend);
    handleFilter(filterResult);
    // eslint-disable-next-line
  }, [filterQuery]);

  const handleFilter = (value) => {
    setFilterResult(value);
    if (value !== '') {
      var tempResult = [];

      for (var i in columnsFromBackend)
        tempResult.push([i, columnsFromBackend[i]]);

      var onlyCards = [];
      var colIds = [];
      var tempColumns = [];

      tempResult.forEach((element) => {
        colIds.push(element[0]);
        onlyCards.push(element[1].items);
      });

      onlyCards.forEach((element, index) => {
        element.forEach((el) => {
          if (filterQuery === 'title') {
            if (el && el.title.toLowerCase().includes(value.toLowerCase())) {
              tempColumns.push([el, colIds[index]]);
            }
          } else if (filterQuery === 'category') {
            if (el && el.category.toLowerCase().includes(value.toLowerCase())) {
              tempColumns.push([el, colIds[index]]);
            }
          } else if (filterQuery === 'reporter') {
            if (el && el.reporter.toLowerCase().includes(value.toLowerCase())) {
              tempColumns.push([el, colIds[index]]);
            }
          } else if (filterQuery === 'priority') {
            if (el && el.priority.toLowerCase().includes(value.toLowerCase())) {
              tempColumns.push([el, colIds[index]]);
            }
          }
        });
      });

      const newColumnsFromBackend = {
        [colIds[0]]: {
          name: 'To Do',
          items: [],
        },
        [colIds[1]]: {
          name: 'In Progress',
          items: [],
        },
        [colIds[2]]: {
          name: 'Ready for QA',
          items: [],
        },
        [colIds[3]]: {
          name: 'Done',
          items: [],
        },
      };
      tempColumns.forEach((element, index) => {
        newColumnsFromBackend[element[1]] &&
          newColumnsFromBackend[element[1]].items.push(element[0]);
      });
      setColumns(newColumnsFromBackend);
    } else {
      setFilterResult('');
      setColumns(columnsFromBackend);
    }
  };

  const handleFilterChange = (value) => {
    setFilterQuery(value);
  };

  return (
    <Paper component='form' className='filter__container'>
      <IconButton
        disabled={true}
        className={classes.iconButton}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation='vertical' />
      <input
        onChange={(event) => handleFilter(event.target.value)}
        className='filter__input'
        placeholder={`Enter filter`}
        value={filterResult}
      />
      <span
        className='material-icons'
        style={{
          visibility: filterResult !== '' ? 'visible' : 'hidden',
          color: '#777',
          cursor: 'pointer',
        }}
        onClick={() => handleFilter('')}
      >
        close
      </span>
      <Divider className={classes.divider} orientation='vertical' />
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-filled-label'>Filter By</InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={filterQuery}
          onChange={(event) => handleFilterChange(event.target.value)}
        >
          <MenuItem value='title'>Title</MenuItem>
          {/* <MenuItem value={10}>Assigned To</MenuItem> */}
          <MenuItem value='category'>Category</MenuItem>
          <MenuItem value='reporter'>Reporter</MenuItem>
          <MenuItem value='priority'>Priority</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default Filter;
