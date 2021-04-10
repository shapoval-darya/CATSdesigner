﻿using System;

namespace Application.Infrastructure.DTO
{
    public class TaskSheetData
    {
        public int DiplomProjectId { get; set; }

        public string InputData { get; set; }

        public string RpzContent { get; set; }

        public string DrawMaterials { get; set; }

        public string Consultants { get; set; }

        public string Faculty { get; set; }

        public string HeadCathedra { get; set; }

        public string Univer { get; set; }

        public string ComputerConsultant { get; set; }

        public string HealthAndSafetyConsultant { get; set; }

        public string EconimicsConsultant { get; set; }

        public string NormocontrolConsultant { get; set; }

        public string DecreeNumber { get; set; }

        public DateTime? DateEnd { get; set; }

        public string DateEndString
        {
            get
            {
                return DateEnd.HasValue ? DateEnd.Value.ToString("dd-MM-yyyy") : null;
            }
        }


        public DateTime? DateStart { get; set; }

        public string DateStartString
        {
            get
            {
                return DateStart.HasValue ? DateStart.Value.ToString("dd-MM-yyyy") : null;
            }
        }

        public DateTime? DecreeDate { get; set; }

        public string DecreeDateString
        {
            get
            {
                return DecreeDate.HasValue ? DecreeDate.Value.ToString("dd-MM-yyyy") : null;
            }
        }
    }
}
