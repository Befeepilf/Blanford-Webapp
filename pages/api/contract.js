import withCors from '../../backend/withCors.js';
import withAuth from '../../backend/withAuth.js';
import withA0M from '../../backend/withA0M.js';
import withStripe from '../../backend/withStripe.js';

const {Client, Document, Signer, File, SignatureField, NoteField, TextField} = require('eversign');
const Eversign = new Client(process.env.EVERSIGN_SECRET, process.env.EVERSIGN_ID);

export default withCors(withAuth(withA0M(withStripe((req, res, stripe, A0M) => {
  if(req.method === 'POST') {
    A0M.getAppMetadata(req.user.sub, res, (error, body) => {
      if(error) {
        res.end(JSON.stringify({error, result: null}));
      }
      else {
        stripe.plans.retrieve(body.app_metadata.defaultPlans[req.body.productId], (error2, plan) => {
          if(error2) {
            console.error("\n", error2, "\n");
            res.statusCode = error2.statusCode || 500;
            res.end(JSON.stringify({error: error2, result: null}));
          }
          else {
            stripe.products.retrieve(req.body.productId, (error3, product) => {
              if(error3) {
                console.error("\n", error3, "\n");
                res.statusCode = error3.statusCode || 500;
                res.end(JSON.stringify({error: error3, result: null}));
              }
              else {
                const doc = new Document();
                doc.setSandbox(process.env.NODE_ENV !== 'production');
                doc.setIsDraft(false);
                doc.setTitle("Dienstvertrag - " + product.name);
                // doc.setMessage("Contract for Blanford's Leadgen Accelerator program");
                doc.setCustomRequesterName(req.body.firstname + ' ' + req.body.surname);
                doc.setRequesterEmail(req.body.email);
                doc.setEmbeddedSigningEnabled(true);


                const contractor = new Signer();
                contractor.setId(1);
                contractor.setName('Max Mustermann');
                contractor.setEmail('max.mustermann@blue-logan.com');
                doc.appendSigner(contractor);

                const client = new Signer();
                client.setId(2);
                client.setName(req.body.firstname + ' ' + req.body.surname);
                client.setEmail(req.body.email);
                doc.appendSigner(client);

                const file = new File({
                  name: 'Contract',
                  fileUrl: plan.metadata.contract
                });
                doc.appendFile(file);

                const sigClient = new SignatureField();
                sigClient.setIdentifier('Signature_Client');
                sigClient.setFileIndex(0);
                sigClient.setRequired(true);
                sigClient.setSigner(client.getId());

                const sigContractor = new SignatureField();
                sigContractor.setIdentifier('Signature_Contractor');
                sigContractor.setFileIndex(0);
                sigContractor.setRequired(true);
                sigContractor.setSigner(contractor.getId());


                // leadgen accelerator
                if(product.id === 'prod_ERam9JvTIAVDty') {
                  const inputName = new TextField();
                  inputName.setIdentifier('TextField_Name');
                  inputName.setPage(1);
                  inputName.setWidth(267);
                  inputName.setX(87);
                  inputName.setY(247);
                  inputName.setValue(req.body.firstname + ' ' + req.body.surname);
                  inputName.setRequired(true);
                  inputName.setSigner(client.getId());
                  doc.appendFormField(inputName);

                  const inputAddress = new NoteField();
                  inputAddress.setIdentifier('NoteField_Address');
                  inputAddress.setPage(1);
                  inputAddress.setWidth(267);
                  inputAddress.setHeight(60);
                  inputAddress.setX(87);
                  inputAddress.setY(547);
                  inputAddress.setValue(req.body.street + ' ' + req.body.houseNumber + '\n' + req.body.postcode);
                  inputAddress.setRequired(true);
                  inputAddress.setSigner(client.getId());
                  doc.appendFormField(inputAddress);

                  const inputDatePlace = new TextField();
                  inputDatePlace.setWidth(231);
                  inputDatePlace.setX(180);
                  inputDatePlace.setSigner(client.getId());

                  sigClient.setX(127);
                  sigContractor.setX(346);

                  // beta program
                  if(plan.id === 'plan_F4WWyow8u0KJdi') {
                    inputDatePlace.setPage(6);
                    inputDatePlace.setY(519);

                    sigClient.setPage(6);
                    sigClient.setY(612);

                    sigContractor.setPage(6);
                    sigContractor.setY(612);
                  }
                  else {
                    const textPrice = new TextField();
                    textPrice.setIdentifier('TextField_Price');
                    textPrice.setPage(4);
                    textPrice.setWidth(39);
                    textPrice.setX(176);
                    textPrice.setY(480);
                    textPrice.setTextSize(18);
                    textPrice.setTextStyle('B');
                    textPrice.setValue(plan.amount / 100);
                    textPrice.setReadOnly(true);
                    textPrice.setSigner('OWNER');
                    doc.appendFormField(textPrice);

                    const now = new Date();

                    const textBillingDate = new TextField();
                    textBillingDate.setIdentifier('TextField_BillingDate');
                    textBillingDate.setPage(4);
                    textBillingDate.setWidth(24);
                    textBillingDate.setX(402);
                    textBillingDate.setY(479.5);
                    textBillingDate.setTextSize(18);
                    textBillingDate.setTextStyle('B');
                    textBillingDate.setValue(now.getDate());
                    textBillingDate.setReadOnly(true);
                    textBillingDate.setSigner('OWNER');
                    doc.appendFormField(textBillingDate);

                    const textStartDate = new TextField();
                    textStartDate.setIdentifier('TextField_StartDate');
                    textStartDate.setPage(4);
                    textStartDate.setWidth(73);
                    textStartDate.setX(304);
                    textStartDate.setY(498);
                    textStartDate.setTextSize(18);
                    textStartDate.setTextStyle('B');
                    textStartDate.setValue(`${now.getDate()}. ${now.getMonth()}. ${now.getFullYear()}`);
                    textStartDate.setReadOnly(true);
                    textStartDate.setSigner('OWNER');
                    doc.appendFormField(textStartDate);

                    inputDatePlace.setPage(7);
                    inputDatePlace.setY(446);

                    sigClient.setPage(7);
                    sigClient.setY(538);

                    sigContractor.setPage(7);
                    sigContractor.setY(538);
                  }

                  doc.appendFormField(inputDatePlace);
                }

                doc.appendFormField(sigClient);
                doc.appendFormField(sigContractor);

                Eversign.createDocument(doc).then((savedDoc) => {
                  console.log("[Eversign]", "Successfully created document");
                  res.end(JSON.stringify({error: null, result: savedDoc.getSigners().find((signer) => signer.getId() === 2).getEmbeddedSigningUrl()}));
                }).catch((error) => {
                  console.error("[Eversign]", error);
                  res.statusCode = 500;
                  res.end(JSON.stringify({error, result: null}));
                });
              }
            });
          }
        });
      }
    });
  }
}))));
