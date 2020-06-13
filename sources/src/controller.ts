import { inject } from "@loopback/context";
import { service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { Request, Response, RestBindings } from "@loopback/rest";
import { SecurityBindings, UserProfile } from "@loopback/security";
import { CRUDController } from "loopback-component-crud";

import {
    AgreementRepository,
    PriorityRepository,
    PlanRepository,
    PlanTypeRepository,
    ApplicationRepository,
    CompanyRepository,
    ShareHolderRepository,
    BoardMemberRepository,
    FileClassRepository,
    FileFieldRepository,
    FileRepository,
    ArchiveApplicationRepository,
    ArchiveCompanyRepository,
    ArchiveMemberRepository,
    ArchiveDocumentRepository,
    ArchiveCommitteeRepository,
    ArchiveLetterRepository,
    ArchiveLetterChangeRepository,
    ArchiveMessageRepository,
    ArchiveFundRepository,
} from "~/repositories";

import {
    AutomationServiceProvider,
    AutomationService,
    SabteAhvalServiceProvider,
    SabteAhvalService,
    SabteSherkatServiceProvider,
    SabteSherkatService,
    SMSServiceProvider,
    SMSService,
} from "~/services";

export class Controller extends CRUDController {
    constructor(
        @inject(RestBindings.Http.REQUEST)
        public request: Request,
        @inject(RestBindings.Http.RESPONSE)
        public response: Response,
        @inject(SecurityBindings.USER, { optional: true })
        public session: UserProfile,

        @repository(AgreementRepository)
        public agreementRepository: AgreementRepository,
        @repository(PriorityRepository)
        public priorityRepository: PriorityRepository,
        @repository(PlanRepository)
        public planRepository: PlanRepository,
        @repository(PlanTypeRepository)
        public planTypeRepository: PlanTypeRepository,

        @repository(ApplicationRepository)
        public applicationRepository: ApplicationRepository,
        @repository(CompanyRepository)
        public companyRepository: CompanyRepository,
        @repository(ShareHolderRepository)
        public shareHolderRepository: ShareHolderRepository,
        @repository(BoardMemberRepository)
        public boardMemberRepository: BoardMemberRepository,

        @repository(FileClassRepository)
        public fileClassRepository: FileClassRepository,
        @repository(FileFieldRepository)
        public fileFieldRepository: FileFieldRepository,
        @repository(FileRepository)
        public fileRepository: FileRepository,

        @repository(ArchiveApplicationRepository)
        public archiveApplicationRepository: ArchiveApplicationRepository,
        @repository(ArchiveCompanyRepository)
        public archiveCompanyRepository: ArchiveCompanyRepository,
        @repository(ArchiveMemberRepository)
        public archiveMemberRepository: ArchiveMemberRepository,
        @repository(ArchiveDocumentRepository)
        public archiveDocumentRepository: ArchiveDocumentRepository,
        @repository(ArchiveCommitteeRepository)
        public archiveCommitteeRepository: ArchiveCommitteeRepository,
        @repository(ArchiveLetterRepository)
        public archiveLetterRepository: ArchiveLetterRepository,
        @repository(ArchiveLetterChangeRepository)
        public archiveLetterChangeRepository: ArchiveLetterChangeRepository,
        @repository(ArchiveMessageRepository)
        public archiveMessageRepository: ArchiveMessageRepository,
        @repository(ArchiveFundRepository)
        public archiveFundRepository: ArchiveFundRepository,

        @service(AutomationServiceProvider)
        public automationService: AutomationService,
        @service(SabteAhvalServiceProvider)
        public sabteAhvalService: SabteAhvalService,
        @service(SabteSherkatServiceProvider)
        public sabteSherkatService: SabteSherkatService,
        @service(SMSServiceProvider)
        public smsService: SMSService
    ) {
        super(request, response, session);
    }
}
