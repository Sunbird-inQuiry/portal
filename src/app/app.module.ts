import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerContentListComponent } from './components/player-content-list/player-content-list.component';
import { PlayerComponent } from './components/player/player.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditConfigurationComponent } from './components/edit-configuration/edit-configuration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsetEditorComponent } from './components/questionset-editor/questionset-editor.component';
import { FilterComponent } from './components/filter/filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionsetListComponent } from './components/questionset-list/questionset-list.component';
import { QuestionsetWorkspaceComponent } from './components/questionset-workspace/questionset-workspace.component';
import { QuestionsetCreateComponent } from './components/questionset-create/questionset-create.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { UsersComponent } from './components/users/users.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListFilterComponent } from './components/list-filter/list-filter.component';

import { ToasterService } from '../app/services/toaster/toaster.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PlayerComponent,
    FooterComponent,
    PlayerContentListComponent,
    EditConfigurationComponent,
    QuestionsetEditorComponent,
    FilterComponent,
    QuestionsetListComponent,
    QuestionsetWorkspaceComponent,
    QuestionsetCreateComponent,
    UserRolesComponent,
    UsersComponent,
    LoaderComponent,
    ListFilterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MatMenuModule,
=======
>>>>>>> inquiry/release-6.2.0
    AppRoutingModule
  ],
  providers: [
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
