import React from 'react'

function DiscountTable() {
    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <th>TYPE OF DISCOUNT</th>
                        <th>CURRENT VALUE</th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                </tfoot>
                <tbody>
                    <tr>
                        <td>Quick booking</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>300 - 600 points</td>
                        <td>20%</td>
                    </tr>
                    <tr>
                        <td>600 - 1200 points</td>
                        <td>30%</td>
                    </tr>
                    <tr>
                        <td>&lt; 1200</td>
                        <td>40%</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

export default DiscountTable
