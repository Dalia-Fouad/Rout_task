async function getData(name = '', amount = '') {
    let responce = await fetch("./customer-data.txt");
    let res = await responce.json();
    console.log(res);
    // console.log('**' + searchValue);
    let tanss = []
    if (!name && !amount)
        displayData(res);
    else if (name && !amount) {
        let data = res.customers.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()))
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let bb = res.transactions.filter((x) => x.customer_id == data[i].id)
            tanss.push(...bb)
        }
        res.transactions = tanss;
        res.customers = data;
        displayData(res);
        // console.log("tanss" );
        // console.log(tanss);
        // console.log(res);


    }
    else if (!name && amount) {
        let data = res.transactions.filter((x) => x.amount == amount)
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let bb = res.customer.filter((x) =>  data[i].customer_id == x.id)
            console.log("bb");
            console.log(bb);
            tanss.push(...bb)
        }
        // res.transactions = tanss;
        // res.customers = data;
        // displayData(res);

    }
    // xx(res);
}
getData()

// const xValues = ["	2022-01-01", "	2022-01-02", "Spain", "USA", "Argentina"];
// const yValues = [1000,2000, 44, 24, 15];
// const barColors = ["red", "green","blue","orange","brown"];

// new Chart("mChart", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     legend: {display: false},
//     title: {
//       display: true,
//       text: "World Wine Production 2018"
//     }
//   }
// });

// ******************************************

$('#name').on('input', function (e) {
    console.log($(e.target).val());
    let searchName = $(e.target).val();
    getData(searchName);
})
// $('#amount').on('input', function (e) {
//     console.log($(e.target).val());
//     let searchName = $(e.target).val();
//     getData('',searchName);
// })


function displayData(data) {
    console.log("data");
    console.log(data);
    let transactions = data.transactions
    // let transberDay = transactions.filter((x) => x.date == '2022-01-01' && x.customer_id == 3)
    // let totalAmountBerDay = transberDay.reduce((sum, trans) => sum += trans.amount, 0)
    // console.log("xx");
    // console.log(transberDay);
    // console.log("mm");
    // console.log(totalAmountBerDay);

    let customerRow = ``;
    for (let i = 0; i < data.customers.length; i++) {
        let trans = transactions.filter((x) => x.customer_id == data.customers[i].id)
        console.log(trans);
        customerRow += `
            <tr>
            <th rowspan="${trans.length}">${i + 1}</th>
                 <th rowspan="${trans.length}">${data.customers[i].name}</th>
                <td>${trans[0].amount}</td>
                 <td>${trans[0].date}</td>
                   <th rowspan="${trans.length}" id="graph">hh</th>
            </tr>`
        for (let j = 1; j < trans.length; j++) {
            customerRow += `
             <tr>
                 <td> ${trans[j].amount}</td>
                 <td>${trans[j].date}</td>
            </tr>
                   `;
        }

    }
    $('#customerData').html(customerRow);
    // $('#graph').html(getGraph());
}





function getGraph() {

    // var table=document.querySelector('table');
    // var canvas = document.createElement("canvas");
    // canvas.setAttribute("id", "myChart");
    // table.rows[0].cells[4].appendChild(canvas);
    const xValues = ["	2022-01-01", "	2022-01-02", "Spain", "USA", "Argentina"];
    const yValues = [1000, 2000, 44, 24, 15];
    const barColors = ["red", "green", "blue", "orange", "brown"];

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "World Wine Production 2018"
            }
        }
    });



}

// getGraph()

// ********************************************************************************************


