const PrescriptionTemplate = (patient,patient_email,healthPractional,hospital,hospitalEmail,medicationName,purpose,Dosage,frequency,medicationName_1="",purpose_1="",Dosage_1="",frequency_1="",medicationName_2="",purpose_2="",Dosage_2="",frequency_2="") => {
   
return `


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>Document</title>
    <style>
        .main-container{
            margin: auto;
            width: 600px;
        }
        .Pfooter{
            display: flex;
            justify-content: space-between;
        }
        .Printbtn{
            display: flex;
            justify-content:flex-end;
            margin: auto;
            width: 600px;
        }
    </style>
</head>
<body>
    <div class="Printbtn"><button type="button" class="btn btn-secondary btn-lg" onclick="print()">Print</button></div>
    <div class="main-container" id="main-container">

        <b>Prescription info</b><br/>
        <table>
            <tbody>
              <tr>
               
                <td>Prescription Date</td>
                <td>${Prescription_Date}</td>
              </tr>
              <tr>
                <td>Prescription Id</td>
                <td>${Prescription_Id}</td>
              </tr>
             
            </tbody>
          </table>
          <br/>

        <b>Patient info</b><br/>
        <table>
            <tbody>
              <tr>
               
                <td>Name</td>
                <td>${patient}</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>${patient_email}</td>
              </tr>
            </tbody>
          </table>
        <br/>
    <b>List of Prescribed Medication</b><br/>

    <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Medication Name</th>
            <th scope="col">Purpose</th>
            <th scope="col">Dosage</th>
            <th scope="col">Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
           
            <td>${medicationName}</td>
            <td>${purpose}</td>
            <td>${Dosage}</td>
            <td>${frequency}</td>
          </tr>
          <tr>
            
            <td>${medicationName_1}</td>
            <td>${purpose_1}</td>
            <td>${Dosage_1}</td>
            <td>${frequency_1}</td>
          </tr>
          <tr>
           
            <td>${medicationName_2}</td>
            <td>${purpose_2}</td>
            <td>${Dosage_2}</td>
            <td>${frequency_2}</td>
          </tr>
        </tbody>
      </table>
    </br>
    <div >
        <div class="Pfooter">
        <p>Health practioner's name</p>
        <p>${healthPractional}</p>
    </div>
     <div class="Pfooter">
        <p>Health center</p>
        <p>${hospital}</p>
    </div>
    <div class="Pfooter">
        <p>Health email</p>
        <p>${hospitalEmail}</p>
    </div>
    </div>
    </div>

   

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js" integrity="sha512-w3u9q/DeneCSwUDjhiMNibTRh/1i/gScBVp2imNVAMCt6cUHIw6xzhzcPFIaL3Q1EbI2l+nu17q2aLJJLo4ZYg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
</body>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js" integrity="sha512-w3u9q/DeneCSwUDjhiMNibTRh/1i/gScBVp2imNVAMCt6cUHIw6xzhzcPFIaL3Q1EbI2l+nu17q2aLJJLo4ZYg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
 
    var element = document.getElementById('main-container',  {
    margin:       30,
    filename:     'myfile.pdf',
    DisablePdfCompression: 1,
    image:        { type: 'jpeg', quality: 75 },
    html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });
  const print =()=>{
    html2pdf(element);
  }
</script>

</html>


`
}