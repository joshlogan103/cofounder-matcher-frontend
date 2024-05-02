import React, { useState } from 'react';
import './filters.css';
import { CheckboxGroup, DropdownMenu, Button, Flex } from '@radix-ui/themes'

const Filters = () => {
  
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
              <DropdownMenu.Item>Harvard</DropdownMenu.Item>
              <DropdownMenu.Item>Stanford</DropdownMenu.Item>
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
              <DropdownMenu.Item>Law</DropdownMenu.Item>
              <DropdownMenu.Item>Business</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Technical */}
          <CheckboxGroup.Root defaultValue={['1']} name="technical">
            <CheckboxGroup.Item value="1">Technical</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          
        </div>
      </Flex>
    </>
  )
}

export default Filters;