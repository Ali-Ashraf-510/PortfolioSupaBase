import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { CvComponent } from './components/cv/cv.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'cv', component: CvComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];