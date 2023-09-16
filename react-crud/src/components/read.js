import React from 'react';
import { Table } from 'semantic-ui-react'
export default function Read() {
    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Food Item</Table.HeaderCell>
                        <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                        <Table.HeaderCell>Expired?</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Milk</Table.Cell>
                        <Table.Cell>09/25/2023</Table.Cell>
                        <Table.Cell>No</Table.Cell>

                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}