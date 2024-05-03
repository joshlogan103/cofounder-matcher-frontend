import { useEffect, useState } from 'react';
import './filters.css';
import { CheckboxGroup, DropdownMenu, Button, Flex } from '@radix-ui/themes'
import {getSchools} from '../../services/apiServices.js';
import {getSchoolById} from '../../services/apiServices.js';
import { getProgramTypes } from '../../services/apiServices.js';



const Filters = ({ setFilters }) => {
  const [ programTypes, setProgramTypes ] = useState([])
  const [ schools, setSchools ] = useState([])

  const handleSchoolChange = (currentSchool) => {
    setFilters(filters => ({ ...filters, currentSchool }));
  };

  const handleProgramChange = (programType) => {
    setFilters(filters => ({ ...filters, programType }));
  };

  const handleTechnicalChange = (event) => {
    setFilters(filters => ({ ...filters, technical: event.target.checked }));
  };

  useEffect(() => {
    const fetchProgramTypes = async () => {
      const programTypes = await getProgramTypes()
      setProgramTypes(programTypes.data)
      console.log(programTypes)
    }
    const fetchSchools = async () => {
      const schoolList = await getSchools()
      setSchools(schoolList.data)
      console.log(schoolList.data)
      console.log(schools)
    }
    fetchProgramTypes()
    fetchSchools()
  },[])

  
  return(
    <>
      <div>Filters</div>

      <Flex gap="3" direction="row" wrap="wrap" asChild>
        <div>

          {/* Schools Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="soft">
                School
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {schools && schools.map((school, index) => (
                <DropdownMenu.Item key={index} onSelect={() => handleSchoolChange(school.name)}>{school.name}</DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Programs Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="soft">
                Program
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {programTypes && programTypes.map((type, index) => (
                <DropdownMenu.Item key={index} onSelect={() => handleProgramChange(type)}>{type}</DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Technical */}
          <CheckboxGroup.Root defaultValue={[]} name="technical">
            <CheckboxGroup.Item value="1" onCheckedChange={handleTechnicalChange}>Technical</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          
        </div>
      </Flex>
    </>
  )
}
export default Filters;

// const filtersObj = {
//   currentSchool: '',
//   programTypes: '',
//   technical: null
// }

// const query = {}

// const filtersToSend = Object.entries(filtersObj).map(([key, value]) => {
//   if (value) {
//     query.key = value
//   }
//   return null;
// })

// query = { currentSchool: 'Harvard' }