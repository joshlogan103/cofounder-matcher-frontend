import { useEffect, useState } from 'react';
import './filters.css';
import { CheckboxGroup, DropdownMenu, Button, Flex } from '@radix-ui/themes'
import { getSchools } from '../../services/apiServices.js';
import { getProgramTypes } from '../../services/apiServices.js';



const Filters = ({ setFilters, handleSearch }) => {
  const [programTypes, setProgramTypes] = useState([])
  const [schools, setSchools] = useState([])
  const [technical, setTechnical] = useState(false)
  const [schoolSelected, setSchoolSelected] = useState(['School'])
  const [programSelected, setProgramSelected] = useState('Program')

  const handleSchoolChange = (schoolName, schoolId) => {
    setFilters(filters => ({ ...filters, currentSchool: schoolId }));
    setSchoolSelected(schoolName)
  };

  const handleProgramChange = (programType) => {
    setFilters(filters => ({ ...filters, programType }));
    setProgramSelected(programType)
  };

  const handleTechnicalChange = (checked) => {
    setTechnical(checked)
    setFilters(filters => ({ ...filters, technical: checked }));
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
  }, [])


  return (
    <>
      <Flex direction={'column'} align={'center'}>
        <div style={{
          fontSize: '24px',
          paddingBottom: '10px'
        }}>Filters</div>

        <Flex gap="3" direction="row" wrap="wrap" align={'center'} asChild>
          <div>

            {/* Schools Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="soft">
                  {schoolSelected}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {schools && schools.map((school, index) => (
                  <DropdownMenu.Item key={index} onSelect={() => handleSchoolChange(school.name, school._id)}>{school.name}</DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            {/* Programs Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="soft">
                  {programSelected}
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
            <CheckboxGroup.Root value={technical ? ['1'] : []}
              name="technical"
              onValueChange={(values) => {
                handleTechnicalChange(values.includes('1'))
              }}>
              <CheckboxGroup.Item value="1" onCheckedChange={handleTechnicalChange}>Technical</CheckboxGroup.Item>
            </CheckboxGroup.Root>

          </div>
        </Flex>
        <Button onClick={handleSearch} style={{ marginTop: '20px' }}>Search</Button>
      </Flex>
    </>
  )
}
export default Filters;