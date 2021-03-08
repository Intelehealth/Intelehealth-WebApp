import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  CommonModule,
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy,
} from "@angular/common";

// Component Import
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./component/homepage/homepage.component";
import { VisitSummaryComponent } from "./component/visit-summary/visit-summary.component";
import { FamilyHistoryComponent } from "./component/visit-summary/family-history/family-history.component";
import { PastMedicalHistoryComponent } from "./component/visit-summary/past-medical-history/past-medical-history.component";
import { PresentingComplaintsComponent } from "./component/visit-summary/presenting-complaints/presenting-complaints.component";
import { OnExaminationComponent } from "./component/visit-summary/on-examination/on-examination.component";
import { PhysicalExaminationComponent } from "./component/visit-summary/physical-examination/physical-examination.component";
import { AdditionalDocumentsComponent } from "./component/visit-summary/additional-documents/additional-documents.component";
import { VitalComponent } from "./component/visit-summary/vital/vital.component";
import { MyAccountComponent } from "./component/my-account/my-account.component";
import { PatientInteractionComponent } from "./component/visit-summary/patient-interaction/patient-interaction.component";
import { AdditionalCommentComponent } from "./component/visit-summary/additional-comment/additional-comment.component";
import { DiagnosisComponent } from "./component/visit-summary/diagnosis/diagnosis.component";
import { PrescribedTestComponent } from "./component/visit-summary/prescribed-test/prescribed-test.component";
import { AdviceComponent } from "./component/visit-summary/advice/advice.component";
import { FollowUpComponent } from "./component/visit-summary/follow-up/follow-up.component";
import { PrescribedMedicationComponent } from "./component/visit-summary/prescribed-medication/prescribed-medication.component";
import { LoginPageComponent } from "./component/login-page/login-page.component";
import { NavbarComponent } from "./component/layout/navbar/navbar.component";
import { ChangePasswordComponent } from "./component/change-password/change-password.component";
import { FooterComponent } from "./component/layout/footer/footer.component";
import { PatientinfoComponent } from "./component/visit-summary/patientinfo/patientinfo.component";
import { PastVisitsComponent } from "./component/visit-summary/past-visits/past-visits.component";
import { FindPatientComponent } from "./component/find-patient/find-patient.component";
import { Page404Component } from "./component/page404/page404.component";
import { EditDetailsComponent } from "./component/my-account/edit-details/edit-details.component";
import { AyuComponent } from "./component/ayu/ayu.component";
import { TablesComponent } from "./component/homepage/tables/tables.component";
import { SignatureComponent } from "./component/my-account/signature/signature.component";
import { CurrentVisitComponent } from "./component/visit-summary/current-visit/current-visit.component";
import { ModalsComponent } from "./component/ayu/modals/modals.component";

// Package Import
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CookieService } from "ngx-cookie-service";
import { AuthGuard } from "./auth.guard";
import { DatePipe } from "@angular/common";
import { UserIdleModule } from "angular-user-idle";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";

// Material Design Imports
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatExpansionModule } from "@angular/material/expansion";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { MainComponent } from "./component/main/main.component";
import { VcComponent } from "./component/vc/vc.component";
import { SocketService } from "./services/socket.service";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    VisitSummaryComponent,
    FamilyHistoryComponent,
    PastMedicalHistoryComponent,
    PresentingComplaintsComponent,
    OnExaminationComponent,
    PhysicalExaminationComponent,
    AdditionalDocumentsComponent,
    VitalComponent,
    MyAccountComponent,
    PatientInteractionComponent,
    AdditionalCommentComponent,
    DiagnosisComponent,
    PrescribedTestComponent,
    AdviceComponent,
    FollowUpComponent,
    LoginPageComponent,
    PrescribedMedicationComponent,
    NavbarComponent,
    ChangePasswordComponent,
    FooterComponent,
    PatientinfoComponent,
    PastVisitsComponent,
    FindPatientComponent,
    Page404Component,
    SignatureComponent,
    EditDetailsComponent,
    AyuComponent,
    TablesComponent,
    CurrentVisitComponent,
    ModalsComponent,
    MainComponent,
    VcComponent,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule,
    UserIdleModule.forRoot({ idle: 900, timeout: 30, ping: 12 }),
    RouterModule.forRoot(
      [
        { path: "login", component: LoginPageComponent },
        {
          path: "",
          component: MainComponent,
          children: [
            {
              path: "home",
              component: HomepageComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "findPatient",
              component: FindPatientComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "myAccount",
              component: MyAccountComponent,
              canActivate: [AuthGuard],
            },
            { path: "ayu", component: AyuComponent, canActivate: [AuthGuard] },
            {
              path: "modals",
              component: ModalsComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "signature",
              component: SignatureComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "editDetails",
              component: EditDetailsComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "changePassword",
              component: ChangePasswordComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "visitSummary/:patient_id/:visit_id",
              component: VisitSummaryComponent,
              canActivate: [AuthGuard],
            },
            {
              path: "vc/emVlc2hhbg/call",
              component: VcComponent,
              canActivate: [AuthGuard],
            },
            { path: "", redirectTo: "home", pathMatch: "full" },
          ],
        },
        { path: "**", component: Page404Component },
      ],
      { scrollPositionRestoration: "enabled" }
    ),
    // tslint:disable-next-line: max-line-length
    ServiceWorkerModule.register("/intelehealth/ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately",
    }),
  ],
  providers: [
    CookieService,
    AuthGuard,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    SocketService,
    { provide: APP_BASE_HREF, useValue: "/" },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
