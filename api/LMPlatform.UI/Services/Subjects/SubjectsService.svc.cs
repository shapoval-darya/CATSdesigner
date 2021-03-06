﻿using System.Linq;
using Application.Core;
using Application.Infrastructure.SubjectManagement;
using System.Web.Http;
using Application.Core.Data;
using LMPlatform.Models;
using LMPlatform.UI.Services.Modules;
using LMPlatform.UI.Services.Modules.Parental;
using LMPlatform.UI.Attributes;
using WebMatrix.WebData;

namespace LMPlatform.UI.Services.Subjects
{
    [JwtAuth(Roles = "lector")]
    public class SubjectsService : ISubjectsService
    {
        private readonly LazyDependency<ISubjectManagementService> subjectManagementService = new LazyDependency<ISubjectManagementService>();

        public ISubjectManagementService SubjectManagementService => subjectManagementService.Value;

        public SubjectsResult GetSubjectsBySession()
        {
            var subjects = SubjectManagementService.GetUserSubjectsV2(WebSecurity.CurrentUserId);

            var result = new SubjectsResult
            {
                Subjects = subjects.Select(e => new SubjectViewData(e)).ToList()
            };

            return result;
        }

        public SubjectResult Update(SubjectViewData subject)
        {
	        var query = new Query<Subject>(s => s.Id == subject.Id)
		        .Include(s => s.SubjectGroups)
		        .Include(s => s.SubjectModules);
            var loadedSubject = SubjectManagementService.GetSubject(query);
            loadedSubject.IsNeededCopyToBts = subject.IsNeededCopyToBts;
            SubjectManagementService.SaveSubject(loadedSubject);
            return new SubjectResult
            {
                Subject = new SubjectViewData(loadedSubject)
            };
        }
    }
}
