"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubeNamespaceList = exports.KubeNamespace = exports.KubeLimitRangeList = exports.KubeLimitRange = exports.KubeEventList = exports.KubeEvent = exports.KubeEndpointsList = exports.KubeEndpoints = exports.KubeConfigMapList = exports.KubeConfigMap = exports.KubeComponentStatusList = exports.KubeComponentStatus = exports.KubeBinding = exports.KubeLeaseList = exports.KubeLease = exports.KubeCertificateSigningRequestList = exports.KubeCertificateSigningRequest = exports.KubeJobList = exports.KubeJob = exports.KubeCronJobList = exports.KubeCronJob = exports.KubeHorizontalPodAutoscalerListV2Beta2 = exports.KubeHorizontalPodAutoscalerV2Beta2 = exports.KubeHorizontalPodAutoscalerListV2 = exports.KubeHorizontalPodAutoscalerV2 = exports.KubeScale = exports.KubeHorizontalPodAutoscalerList = exports.KubeHorizontalPodAutoscaler = exports.KubeSubjectAccessReview = exports.KubeSelfSubjectRulesReview = exports.KubeSelfSubjectAccessReview = exports.KubeLocalSubjectAccessReview = exports.KubeTokenReview = exports.KubeTokenRequest = exports.KubeStatefulSetList = exports.KubeStatefulSet = exports.KubeReplicaSetList = exports.KubeReplicaSet = exports.KubeDeploymentList = exports.KubeDeployment = exports.KubeDaemonSetList = exports.KubeDaemonSet = exports.KubeControllerRevisionList = exports.KubeControllerRevision = exports.KubeStorageVersionListV1Alpha1 = exports.KubeStorageVersionV1Alpha1 = exports.KubeValidatingWebhookConfigurationList = exports.KubeValidatingWebhookConfiguration = exports.KubeMutatingWebhookConfigurationList = exports.KubeMutatingWebhookConfiguration = void 0;
exports.KubeRoleBindingList = exports.KubeRoleBinding = exports.KubeRole = exports.KubeClusterRoleList = exports.KubeClusterRoleBindingList = exports.KubeClusterRoleBinding = exports.KubeClusterRole = exports.KubePodDisruptionBudgetList = exports.KubePodDisruptionBudget = exports.KubeEviction = exports.KubeRuntimeClassList = exports.KubeRuntimeClass = exports.KubeClusterCidrListV1Alpha1 = exports.KubeClusterCidrv1Alpha1 = exports.KubeNetworkPolicyList = exports.KubeNetworkPolicy = exports.KubeIngressList = exports.KubeIngressClassList = exports.KubeIngressClass = exports.KubeIngress = exports.KubePriorityLevelConfigurationListV1Beta2 = exports.KubePriorityLevelConfigurationV1Beta2 = exports.KubeFlowSchemaListV1Beta2 = exports.KubeFlowSchemaV1Beta2 = exports.KubePriorityLevelConfigurationListV1Beta1 = exports.KubePriorityLevelConfigurationV1Beta1 = exports.KubeFlowSchemaListV1Beta1 = exports.KubeFlowSchemaV1Beta1 = exports.KubeEndpointSliceList = exports.KubeEndpointSlice = exports.KubeServiceList = exports.KubeServiceAccountList = exports.KubeServiceAccount = exports.KubeService = exports.KubeSecretList = exports.KubeSecret = exports.KubeResourceQuotaList = exports.KubeResourceQuota = exports.KubeReplicationControllerList = exports.KubeReplicationController = exports.KubePodTemplateList = exports.KubePodTemplate = exports.KubePodList = exports.KubePod = exports.KubePersistentVolumeList = exports.KubePersistentVolumeClaimList = exports.KubePersistentVolumeClaim = exports.KubePersistentVolume = exports.KubeNodeList = exports.KubeNode = void 0;
exports.toJson_KubeCronJobProps = exports.toJson_KubeHorizontalPodAutoscalerListV2Beta2Props = exports.toJson_KubeHorizontalPodAutoscalerV2Beta2Props = exports.toJson_KubeHorizontalPodAutoscalerListV2Props = exports.toJson_KubeHorizontalPodAutoscalerV2Props = exports.toJson_KubeScaleProps = exports.toJson_KubeHorizontalPodAutoscalerListProps = exports.toJson_KubeHorizontalPodAutoscalerProps = exports.toJson_KubeSubjectAccessReviewProps = exports.toJson_KubeSelfSubjectRulesReviewProps = exports.toJson_KubeSelfSubjectAccessReviewProps = exports.toJson_KubeLocalSubjectAccessReviewProps = exports.toJson_KubeTokenReviewProps = exports.toJson_KubeTokenRequestProps = exports.toJson_KubeStatefulSetListProps = exports.toJson_KubeStatefulSetProps = exports.toJson_KubeReplicaSetListProps = exports.toJson_KubeReplicaSetProps = exports.toJson_KubeDeploymentListProps = exports.toJson_KubeDeploymentProps = exports.toJson_KubeDaemonSetListProps = exports.toJson_KubeDaemonSetProps = exports.toJson_KubeControllerRevisionListProps = exports.toJson_KubeControllerRevisionProps = exports.toJson_KubeStorageVersionListV1Alpha1Props = exports.toJson_KubeStorageVersionV1Alpha1Props = exports.toJson_KubeValidatingWebhookConfigurationListProps = exports.toJson_KubeValidatingWebhookConfigurationProps = exports.toJson_KubeMutatingWebhookConfigurationListProps = exports.toJson_KubeMutatingWebhookConfigurationProps = exports.KubeApiServiceList = exports.KubeApiService = exports.KubeStatus = exports.KubeCustomResourceDefinitionList = exports.KubeCustomResourceDefinition = exports.KubeCsiStorageCapacityListV1Beta1 = exports.KubeCsiStorageCapacityV1Beta1 = exports.KubeVolumeAttachmentList = exports.KubeVolumeAttachment = exports.KubeStorageClassList = exports.KubeStorageClass = exports.KubeCsiStorageCapacityList = exports.KubeCsiStorageCapacity = exports.KubeCsiNodeList = exports.KubeCsiNode = exports.KubeCsiDriverList = exports.KubeCsiDriver = exports.KubePriorityClassList = exports.KubePriorityClass = exports.KubeRoleList = void 0;
exports.toJson_KubePriorityLevelConfigurationListV1Beta2Props = exports.toJson_KubePriorityLevelConfigurationV1Beta2Props = exports.toJson_KubeFlowSchemaListV1Beta2Props = exports.toJson_KubeFlowSchemaV1Beta2Props = exports.toJson_KubePriorityLevelConfigurationListV1Beta1Props = exports.toJson_KubePriorityLevelConfigurationV1Beta1Props = exports.toJson_KubeFlowSchemaListV1Beta1Props = exports.toJson_KubeFlowSchemaV1Beta1Props = exports.toJson_KubeEndpointSliceListProps = exports.toJson_KubeEndpointSliceProps = exports.toJson_KubeServiceListProps = exports.toJson_KubeServiceAccountListProps = exports.toJson_KubeServiceAccountProps = exports.toJson_KubeServiceProps = exports.toJson_KubeSecretListProps = exports.toJson_KubeSecretProps = exports.toJson_KubeResourceQuotaListProps = exports.toJson_KubeResourceQuotaProps = exports.toJson_KubeReplicationControllerListProps = exports.toJson_KubeReplicationControllerProps = exports.toJson_KubePodTemplateListProps = exports.toJson_KubePodTemplateProps = exports.toJson_KubePodListProps = exports.toJson_KubePodProps = exports.toJson_KubePersistentVolumeListProps = exports.toJson_KubePersistentVolumeClaimListProps = exports.toJson_KubePersistentVolumeClaimProps = exports.toJson_KubePersistentVolumeProps = exports.toJson_KubeNodeListProps = exports.toJson_KubeNodeProps = exports.toJson_KubeNamespaceListProps = exports.toJson_KubeNamespaceProps = exports.toJson_KubeLimitRangeListProps = exports.toJson_KubeLimitRangeProps = exports.toJson_KubeEventListProps = exports.toJson_KubeEventProps = exports.toJson_KubeEndpointsListProps = exports.toJson_KubeEndpointsProps = exports.toJson_KubeConfigMapListProps = exports.toJson_KubeConfigMapProps = exports.toJson_KubeComponentStatusListProps = exports.toJson_KubeComponentStatusProps = exports.toJson_KubeBindingProps = exports.toJson_KubeLeaseListProps = exports.toJson_KubeLeaseProps = exports.toJson_KubeCertificateSigningRequestListProps = exports.toJson_KubeCertificateSigningRequestProps = exports.toJson_KubeJobListProps = exports.toJson_KubeJobProps = exports.toJson_KubeCronJobListProps = void 0;
exports.toJson_TokenReviewSpec = exports.toJson_TokenRequestSpec = exports.toJson_StatefulSetSpec = exports.toJson_ReplicaSetSpec = exports.toJson_DeploymentSpec = exports.toJson_DaemonSetSpec = exports.toJson_ValidatingWebhook = exports.toJson_ListMeta = exports.toJson_MutatingWebhook = exports.toJson_ObjectMeta = exports.toJson_KubeApiServiceListProps = exports.toJson_KubeApiServiceProps = exports.toJson_KubeStatusProps = exports.toJson_KubeCustomResourceDefinitionListProps = exports.toJson_KubeCustomResourceDefinitionProps = exports.toJson_KubeCsiStorageCapacityListV1Beta1Props = exports.toJson_KubeCsiStorageCapacityV1Beta1Props = exports.toJson_KubeVolumeAttachmentListProps = exports.toJson_KubeVolumeAttachmentProps = exports.toJson_KubeStorageClassListProps = exports.toJson_KubeStorageClassProps = exports.toJson_KubeCsiStorageCapacityListProps = exports.toJson_KubeCsiStorageCapacityProps = exports.toJson_KubeCsiNodeListProps = exports.toJson_KubeCsiNodeProps = exports.toJson_KubeCsiDriverListProps = exports.toJson_KubeCsiDriverProps = exports.toJson_KubePriorityClassListProps = exports.toJson_KubePriorityClassProps = exports.toJson_KubeRoleListProps = exports.toJson_KubeRoleBindingListProps = exports.toJson_KubeRoleBindingProps = exports.toJson_KubeRoleProps = exports.toJson_KubeClusterRoleListProps = exports.toJson_KubeClusterRoleBindingListProps = exports.toJson_KubeClusterRoleBindingProps = exports.toJson_KubeClusterRoleProps = exports.toJson_KubePodDisruptionBudgetListProps = exports.toJson_KubePodDisruptionBudgetProps = exports.toJson_KubeEvictionProps = exports.toJson_KubeRuntimeClassListProps = exports.toJson_KubeRuntimeClassProps = exports.toJson_KubeClusterCidrListV1Alpha1Props = exports.toJson_KubeClusterCidrv1Alpha1Props = exports.toJson_KubeNetworkPolicyListProps = exports.toJson_KubeNetworkPolicyProps = exports.toJson_KubeIngressListProps = exports.toJson_KubeIngressClassListProps = exports.toJson_KubeIngressClassProps = exports.toJson_KubeIngressProps = void 0;
exports.toJson_TopologySelectorTerm = exports.toJson_LabelSelector = exports.Quantity = exports.toJson_CsiNodeSpec = exports.toJson_CsiDriverSpec = exports.toJson_Subject = exports.toJson_RoleRef = exports.toJson_PolicyRule = exports.toJson_AggregationRule = exports.toJson_PodDisruptionBudgetSpec = exports.toJson_DeleteOptions = exports.toJson_Scheduling = exports.toJson_Overhead = exports.toJson_ClusterCidrSpecV1Alpha1 = exports.toJson_NetworkPolicySpec = exports.toJson_IngressClassSpec = exports.toJson_IngressSpec = exports.toJson_PriorityLevelConfigurationSpecV1Beta2 = exports.toJson_FlowSchemaSpecV1Beta2 = exports.toJson_PriorityLevelConfigurationSpecV1Beta1 = exports.toJson_FlowSchemaSpecV1Beta1 = exports.toJson_EndpointPort = exports.toJson_Endpoint = exports.toJson_LocalObjectReference = exports.toJson_ServiceSpec = exports.toJson_ResourceQuotaSpec = exports.toJson_ReplicationControllerSpec = exports.toJson_PodTemplateSpec = exports.toJson_PodSpec = exports.toJson_PersistentVolumeClaimSpec = exports.toJson_PersistentVolumeSpec = exports.toJson_NodeSpec = exports.toJson_NamespaceSpec = exports.toJson_LimitRangeSpec = exports.toJson_EventSeries = exports.toJson_EventSource = exports.toJson_EndpointSubset = exports.toJson_ComponentCondition = exports.toJson_ObjectReference = exports.toJson_LeaseSpec = exports.toJson_CertificateSigningRequestSpec = exports.toJson_JobSpec = exports.toJson_CronJobSpec = exports.toJson_HorizontalPodAutoscalerSpecV2Beta2 = exports.toJson_HorizontalPodAutoscalerSpecV2 = exports.toJson_ScaleSpec = exports.toJson_HorizontalPodAutoscalerSpec = exports.toJson_SelfSubjectRulesReviewSpec = exports.toJson_SelfSubjectAccessReviewSpec = exports.toJson_SubjectAccessReviewSpec = void 0;
exports.toJson_StorageOsPersistentVolumeSource = exports.toJson_ScaleIoPersistentVolumeSource = exports.toJson_RbdPersistentVolumeSource = exports.toJson_QuobyteVolumeSource = exports.toJson_PortworxVolumeSource = exports.toJson_PhotonPersistentDiskVolumeSource = exports.toJson_VolumeNodeAffinity = exports.toJson_NfsVolumeSource = exports.toJson_LocalVolumeSource = exports.toJson_IscsiPersistentVolumeSource = exports.toJson_HostPathVolumeSource = exports.toJson_GlusterfsPersistentVolumeSource = exports.toJson_GcePersistentDiskVolumeSource = exports.toJson_FlockerVolumeSource = exports.toJson_FlexPersistentVolumeSource = exports.toJson_FcVolumeSource = exports.toJson_CsiPersistentVolumeSource = exports.toJson_CinderPersistentVolumeSource = exports.toJson_CephFsPersistentVolumeSource = exports.toJson_AzureFilePersistentVolumeSource = exports.toJson_AzureDiskVolumeSource = exports.toJson_AwsElasticBlockStoreVolumeSource = exports.toJson_Taint = exports.toJson_NodeConfigSource = exports.toJson_LimitRangeItem = exports.toJson_EndpointAddress = exports.toJson_PodFailurePolicy = exports.toJson_JobTemplateSpec = exports.toJson_CrossVersionObjectReferenceV2Beta2 = exports.toJson_MetricSpecV2Beta2 = exports.toJson_HorizontalPodAutoscalerBehaviorV2Beta2 = exports.toJson_CrossVersionObjectReferenceV2 = exports.toJson_MetricSpecV2 = exports.toJson_HorizontalPodAutoscalerBehaviorV2 = exports.toJson_CrossVersionObjectReference = exports.toJson_ResourceAttributes = exports.toJson_NonResourceAttributes = exports.toJson_BoundObjectReference = exports.toJson_StatefulSetUpdateStrategy = exports.toJson_StatefulSetPersistentVolumeClaimRetentionPolicy = exports.toJson_DeploymentStrategy = exports.toJson_DaemonSetUpdateStrategy = exports.toJson_RuleWithOperations = exports.toJson_WebhookClientConfig = exports.toJson_OwnerReference = exports.toJson_ManagedFieldsEntry = exports.toJson_ApiServiceSpec = exports.toJson_StatusDetails = exports.toJson_CustomResourceDefinitionSpec = exports.toJson_VolumeAttachmentSpec = void 0;
exports.toJson_RollingUpdateStatefulSetStrategy = exports.toJson_RollingUpdateDeployment = exports.toJson_RollingUpdateDaemonSet = exports.toJson_ServiceReference = exports.toJson_StatusCause = exports.toJson_CustomResourceDefinitionVersion = exports.toJson_CustomResourceDefinitionNames = exports.toJson_CustomResourceConversion = exports.toJson_VolumeAttachmentSource = exports.toJson_TopologySelectorLabelRequirement = exports.toJson_LabelSelectorRequirement = exports.toJson_CsiNodeDriver = exports.toJson_TokenRequest = exports.IntOrString = exports.toJson_Preconditions = exports.IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind = exports.toJson_NodeSelector = exports.toJson_NetworkPolicyIngressRule = exports.toJson_NetworkPolicyEgressRule = exports.toJson_IngressClassParametersReference = exports.toJson_IngressTls = exports.toJson_IngressRule = exports.toJson_IngressBackend = exports.toJson_LimitedPriorityLevelConfigurationV1Beta2 = exports.toJson_PolicyRulesWithSubjectsV1Beta2 = exports.toJson_PriorityLevelConfigurationReferenceV1Beta2 = exports.toJson_FlowDistinguisherMethodV1Beta2 = exports.toJson_LimitedPriorityLevelConfigurationV1Beta1 = exports.toJson_PolicyRulesWithSubjectsV1Beta1 = exports.toJson_PriorityLevelConfigurationReferenceV1Beta1 = exports.toJson_FlowDistinguisherMethodV1Beta1 = exports.toJson_EndpointHints = exports.toJson_EndpointConditions = exports.toJson_SessionAffinityConfig = exports.toJson_ServicePort = exports.toJson_ScopeSelector = exports.toJson_Volume = exports.toJson_TopologySpreadConstraint = exports.toJson_Toleration = exports.toJson_PodSecurityContext = exports.toJson_PodReadinessGate = exports.toJson_PodOs = exports.toJson_HostAlias = exports.toJson_EphemeralContainer = exports.toJson_PodDnsConfig = exports.toJson_Container = exports.toJson_Affinity = exports.toJson_ResourceRequirements = exports.toJson_TypedLocalObjectReference = exports.toJson_VsphereVirtualDiskVolumeSource = void 0;
exports.toJson_ScopedResourceSelectorRequirement = exports.toJson_StorageOsVolumeSource = exports.toJson_SecretVolumeSource = exports.toJson_ScaleIoVolumeSource = exports.toJson_RbdVolumeSource = exports.toJson_ProjectedVolumeSource = exports.toJson_PersistentVolumeClaimVolumeSource = exports.toJson_IscsiVolumeSource = exports.toJson_GlusterfsVolumeSource = exports.toJson_GitRepoVolumeSource = exports.toJson_FlexVolumeSource = exports.toJson_EphemeralVolumeSource = exports.toJson_EmptyDirVolumeSource = exports.toJson_DownwardApiVolumeSource = exports.toJson_CsiVolumeSource = exports.toJson_ConfigMapVolumeSource = exports.toJson_CinderVolumeSource = exports.toJson_CephFsVolumeSource = exports.toJson_AzureFileVolumeSource = exports.toJson_WindowsSecurityContextOptions = exports.toJson_Sysctl = exports.toJson_SeccompProfile = exports.toJson_SeLinuxOptions = exports.toJson_PodDnsConfigOption = exports.toJson_VolumeMount = exports.toJson_VolumeDevice = exports.toJson_SecurityContext = exports.toJson_ContainerPort = exports.toJson_Probe = exports.toJson_Lifecycle = exports.toJson_EnvFromSource = exports.toJson_EnvVar = exports.toJson_PodAntiAffinity = exports.toJson_PodAffinity = exports.toJson_NodeAffinity = exports.toJson_SecretReference = exports.toJson_ConfigMapNodeConfigSource = exports.toJson_PodFailurePolicyRule = exports.toJson_ResourceMetricSourceV2Beta2 = exports.toJson_PodsMetricSourceV2Beta2 = exports.toJson_ObjectMetricSourceV2Beta2 = exports.toJson_ExternalMetricSourceV2Beta2 = exports.toJson_ContainerResourceMetricSourceV2Beta2 = exports.toJson_HpaScalingRulesV2Beta2 = exports.toJson_ResourceMetricSourceV2 = exports.toJson_PodsMetricSourceV2 = exports.toJson_ObjectMetricSourceV2 = exports.toJson_ExternalMetricSourceV2 = exports.toJson_ContainerResourceMetricSourceV2 = exports.toJson_HpaScalingRulesV2 = void 0;
exports.toJson_ServiceAccountSubjectV1Beta2 = exports.toJson_GroupSubjectV1Beta2 = exports.toJson_QueuingConfigurationV1Beta1 = exports.toJson_UserSubjectV1Beta1 = exports.toJson_ServiceAccountSubjectV1Beta1 = exports.toJson_GroupSubjectV1Beta1 = exports.toJson_VolumeProjection = exports.toJson_PersistentVolumeClaimTemplate = exports.toJson_DownwardApiVolumeFile = exports.toJson_KeyToPath = exports.toJson_Capabilities = exports.toJson_TcpSocketAction = exports.toJson_HttpGetAction = exports.toJson_GrpcAction = exports.toJson_ExecAction = exports.toJson_LifecycleHandler = exports.toJson_SecretEnvSource = exports.toJson_ConfigMapEnvSource = exports.toJson_EnvVarSource = exports.toJson_PodAffinityTerm = exports.toJson_WeightedPodAffinityTerm = exports.toJson_PreferredSchedulingTerm = exports.toJson_PodFailurePolicyOnPodConditionsPattern = exports.toJson_PodFailurePolicyOnExitCodesRequirement = exports.toJson_MetricIdentifierV2Beta2 = exports.toJson_MetricTargetV2Beta2 = exports.toJson_HpaScalingPolicyV2Beta2 = exports.toJson_MetricIdentifierV2 = exports.toJson_MetricTargetV2 = exports.toJson_HpaScalingPolicyV2 = exports.toJson_CustomResourceSubresources = exports.toJson_CustomResourceValidation = exports.toJson_CustomResourceColumnDefinition = exports.toJson_WebhookConversion = exports.toJson_VolumeNodeResources = exports.toJson_NodeSelectorTerm = exports.toJson_NetworkPolicyPeer = exports.toJson_NetworkPolicyPort = exports.toJson_HttpIngressRuleValue = exports.toJson_IngressServiceBackend = exports.toJson_LimitResponseV1Beta2 = exports.toJson_SubjectV1Beta2 = exports.toJson_ResourcePolicyRuleV1Beta2 = exports.toJson_NonResourcePolicyRuleV1Beta2 = exports.toJson_LimitResponseV1Beta1 = exports.toJson_SubjectV1Beta1 = exports.toJson_ResourcePolicyRuleV1Beta1 = exports.toJson_NonResourcePolicyRuleV1Beta1 = exports.toJson_ForZone = exports.toJson_ClientIpConfig = void 0;
exports.toJson_ValidationRule = exports.toJson_ExternalDocumentation = exports.toJson_ServiceAccountTokenProjection = exports.toJson_SecretProjection = exports.toJson_DownwardApiProjection = exports.toJson_ConfigMapProjection = exports.toJson_HttpHeader = exports.toJson_SecretKeySelector = exports.toJson_ResourceFieldSelector = exports.toJson_ObjectFieldSelector = exports.toJson_ConfigMapKeySelector = exports.toJson_CustomResourceSubresourceScale = exports.toJson_JsonSchemaProps = exports.toJson_NodeSelectorRequirement = exports.toJson_IpBlock = exports.toJson_HttpIngressPath = exports.toJson_ServiceBackendPort = exports.toJson_QueuingConfigurationV1Beta2 = exports.toJson_UserSubjectV1Beta2 = void 0;
// generated by cdk8s
const cdk8s_1 = require("cdk8s");
/**
 * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object.
 *
 * @schema io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration
 */
class KubeMutatingWebhookConfiguration extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration"
     */
    static GVK = {
        apiVersion: 'admissionregistration.k8s.io/v1',
        kind: 'MutatingWebhookConfiguration'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeMutatingWebhookConfiguration.GVK,
            ...toJson_KubeMutatingWebhookConfigurationProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.admissionregistration.v1.MutatingWebhookConfiguration" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeMutatingWebhookConfiguration.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeMutatingWebhookConfiguration.GVK,
            ...toJson_KubeMutatingWebhookConfigurationProps(resolved)
        };
    }
}
exports.KubeMutatingWebhookConfiguration = KubeMutatingWebhookConfiguration;
/**
 * MutatingWebhookConfigurationList is a list of MutatingWebhookConfiguration.
 *
 * @schema io.k8s.api.admissionregistration.v1.MutatingWebhookConfigurationList
 */
class KubeMutatingWebhookConfigurationList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.admissionregistration.v1.MutatingWebhookConfigurationList"
     */
    static GVK = {
        apiVersion: 'admissionregistration.k8s.io/v1',
        kind: 'MutatingWebhookConfigurationList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.admissionregistration.v1.MutatingWebhookConfigurationList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeMutatingWebhookConfigurationList.GVK,
            ...toJson_KubeMutatingWebhookConfigurationListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.admissionregistration.v1.MutatingWebhookConfigurationList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeMutatingWebhookConfigurationList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeMutatingWebhookConfigurationList.GVK,
            ...toJson_KubeMutatingWebhookConfigurationListProps(resolved)
        };
    }
}
exports.KubeMutatingWebhookConfigurationList = KubeMutatingWebhookConfigurationList;
/**
 * ValidatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and object without changing it.
 *
 * @schema io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration
 */
class KubeValidatingWebhookConfiguration extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration"
     */
    static GVK = {
        apiVersion: 'admissionregistration.k8s.io/v1',
        kind: 'ValidatingWebhookConfiguration'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeValidatingWebhookConfiguration.GVK,
            ...toJson_KubeValidatingWebhookConfigurationProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfiguration" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeValidatingWebhookConfiguration.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeValidatingWebhookConfiguration.GVK,
            ...toJson_KubeValidatingWebhookConfigurationProps(resolved)
        };
    }
}
exports.KubeValidatingWebhookConfiguration = KubeValidatingWebhookConfiguration;
/**
 * ValidatingWebhookConfigurationList is a list of ValidatingWebhookConfiguration.
 *
 * @schema io.k8s.api.admissionregistration.v1.ValidatingWebhookConfigurationList
 */
class KubeValidatingWebhookConfigurationList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfigurationList"
     */
    static GVK = {
        apiVersion: 'admissionregistration.k8s.io/v1',
        kind: 'ValidatingWebhookConfigurationList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfigurationList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeValidatingWebhookConfigurationList.GVK,
            ...toJson_KubeValidatingWebhookConfigurationListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.admissionregistration.v1.ValidatingWebhookConfigurationList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeValidatingWebhookConfigurationList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeValidatingWebhookConfigurationList.GVK,
            ...toJson_KubeValidatingWebhookConfigurationListProps(resolved)
        };
    }
}
exports.KubeValidatingWebhookConfigurationList = KubeValidatingWebhookConfigurationList;
/**
 * Storage version of a specific resource.
 *
 * @schema io.k8s.api.apiserverinternal.v1alpha1.StorageVersion
 */
class KubeStorageVersionV1Alpha1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apiserverinternal.v1alpha1.StorageVersion"
     */
    static GVK = {
        apiVersion: 'internal.apiserver.k8s.io/v1alpha1',
        kind: 'StorageVersion'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apiserverinternal.v1alpha1.StorageVersion".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeStorageVersionV1Alpha1.GVK,
            ...toJson_KubeStorageVersionV1Alpha1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apiserverinternal.v1alpha1.StorageVersion" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeStorageVersionV1Alpha1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStorageVersionV1Alpha1.GVK,
            ...toJson_KubeStorageVersionV1Alpha1Props(resolved)
        };
    }
}
exports.KubeStorageVersionV1Alpha1 = KubeStorageVersionV1Alpha1;
/**
 * A list of StorageVersions.
 *
 * @schema io.k8s.api.apiserverinternal.v1alpha1.StorageVersionList
 */
class KubeStorageVersionListV1Alpha1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionList"
     */
    static GVK = {
        apiVersion: 'internal.apiserver.k8s.io/v1alpha1',
        kind: 'StorageVersionList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeStorageVersionListV1Alpha1.GVK,
            ...toJson_KubeStorageVersionListV1Alpha1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apiserverinternal.v1alpha1.StorageVersionList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeStorageVersionListV1Alpha1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStorageVersionListV1Alpha1.GVK,
            ...toJson_KubeStorageVersionListV1Alpha1Props(resolved)
        };
    }
}
exports.KubeStorageVersionListV1Alpha1 = KubeStorageVersionListV1Alpha1;
/**
 * ControllerRevision implements an immutable snapshot of state data. Clients are responsible for serializing and deserializing the objects that contain their internal state. Once a ControllerRevision has been successfully created, it can not be updated. The API Server will fail validation of all requests that attempt to mutate the Data field. ControllerRevisions may, however, be deleted. Note that, due to its use by both the DaemonSet and StatefulSet controllers for update and rollback, this object is beta. However, it may be subject to name and representation changes in future releases, and clients should not depend on its stability. It is primarily for internal use by controllers.
 *
 * @schema io.k8s.api.apps.v1.ControllerRevision
 */
class KubeControllerRevision extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.ControllerRevision"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'ControllerRevision'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.ControllerRevision".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeControllerRevision.GVK,
            ...toJson_KubeControllerRevisionProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.ControllerRevision" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeControllerRevision.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeControllerRevision.GVK,
            ...toJson_KubeControllerRevisionProps(resolved)
        };
    }
}
exports.KubeControllerRevision = KubeControllerRevision;
/**
 * ControllerRevisionList is a resource containing a list of ControllerRevision objects.
 *
 * @schema io.k8s.api.apps.v1.ControllerRevisionList
 */
class KubeControllerRevisionList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.ControllerRevisionList"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'ControllerRevisionList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.ControllerRevisionList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeControllerRevisionList.GVK,
            ...toJson_KubeControllerRevisionListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.ControllerRevisionList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeControllerRevisionList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeControllerRevisionList.GVK,
            ...toJson_KubeControllerRevisionListProps(resolved)
        };
    }
}
exports.KubeControllerRevisionList = KubeControllerRevisionList;
/**
 * DaemonSet represents the configuration of a daemon set.
 *
 * @schema io.k8s.api.apps.v1.DaemonSet
 */
class KubeDaemonSet extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.DaemonSet"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'DaemonSet'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.DaemonSet".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeDaemonSet.GVK,
            ...toJson_KubeDaemonSetProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.DaemonSet" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeDaemonSet.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeDaemonSet.GVK,
            ...toJson_KubeDaemonSetProps(resolved)
        };
    }
}
exports.KubeDaemonSet = KubeDaemonSet;
/**
 * DaemonSetList is a collection of daemon sets.
 *
 * @schema io.k8s.api.apps.v1.DaemonSetList
 */
class KubeDaemonSetList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.DaemonSetList"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'DaemonSetList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.DaemonSetList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeDaemonSetList.GVK,
            ...toJson_KubeDaemonSetListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.DaemonSetList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeDaemonSetList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeDaemonSetList.GVK,
            ...toJson_KubeDaemonSetListProps(resolved)
        };
    }
}
exports.KubeDaemonSetList = KubeDaemonSetList;
/**
 * Deployment enables declarative updates for Pods and ReplicaSets.
 *
 * @schema io.k8s.api.apps.v1.Deployment
 */
class KubeDeployment extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.Deployment"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'Deployment'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.Deployment".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeDeployment.GVK,
            ...toJson_KubeDeploymentProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.Deployment" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeDeployment.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeDeployment.GVK,
            ...toJson_KubeDeploymentProps(resolved)
        };
    }
}
exports.KubeDeployment = KubeDeployment;
/**
 * DeploymentList is a list of Deployments.
 *
 * @schema io.k8s.api.apps.v1.DeploymentList
 */
class KubeDeploymentList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.DeploymentList"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'DeploymentList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.DeploymentList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeDeploymentList.GVK,
            ...toJson_KubeDeploymentListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.DeploymentList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeDeploymentList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeDeploymentList.GVK,
            ...toJson_KubeDeploymentListProps(resolved)
        };
    }
}
exports.KubeDeploymentList = KubeDeploymentList;
/**
 * ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 *
 * @schema io.k8s.api.apps.v1.ReplicaSet
 */
class KubeReplicaSet extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.ReplicaSet"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'ReplicaSet'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.ReplicaSet".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeReplicaSet.GVK,
            ...toJson_KubeReplicaSetProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.ReplicaSet" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeReplicaSet.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeReplicaSet.GVK,
            ...toJson_KubeReplicaSetProps(resolved)
        };
    }
}
exports.KubeReplicaSet = KubeReplicaSet;
/**
 * ReplicaSetList is a collection of ReplicaSets.
 *
 * @schema io.k8s.api.apps.v1.ReplicaSetList
 */
class KubeReplicaSetList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.ReplicaSetList"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'ReplicaSetList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.ReplicaSetList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeReplicaSetList.GVK,
            ...toJson_KubeReplicaSetListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.ReplicaSetList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeReplicaSetList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeReplicaSetList.GVK,
            ...toJson_KubeReplicaSetListProps(resolved)
        };
    }
}
exports.KubeReplicaSetList = KubeReplicaSetList;
/**
 * StatefulSet represents a set of pods with consistent identities. Identities are defined as:
  - Network: A single stable DNS and hostname.
  - Storage: As many VolumeClaims as requested.

The StatefulSet guarantees that a given network identity will always map to the same storage identity.
 *
 * @schema io.k8s.api.apps.v1.StatefulSet
 */
class KubeStatefulSet extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.StatefulSet"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'StatefulSet'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.StatefulSet".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeStatefulSet.GVK,
            ...toJson_KubeStatefulSetProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.StatefulSet" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeStatefulSet.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStatefulSet.GVK,
            ...toJson_KubeStatefulSetProps(resolved)
        };
    }
}
exports.KubeStatefulSet = KubeStatefulSet;
/**
 * StatefulSetList is a collection of StatefulSets.
 *
 * @schema io.k8s.api.apps.v1.StatefulSetList
 */
class KubeStatefulSetList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.apps.v1.StatefulSetList"
     */
    static GVK = {
        apiVersion: 'apps/v1',
        kind: 'StatefulSetList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.apps.v1.StatefulSetList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeStatefulSetList.GVK,
            ...toJson_KubeStatefulSetListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.apps.v1.StatefulSetList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeStatefulSetList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStatefulSetList.GVK,
            ...toJson_KubeStatefulSetListProps(resolved)
        };
    }
}
exports.KubeStatefulSetList = KubeStatefulSetList;
/**
 * TokenRequest requests a token for a given service account.
 *
 * @schema io.k8s.api.authentication.v1.TokenRequest
 */
class KubeTokenRequest extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.authentication.v1.TokenRequest"
     */
    static GVK = {
        apiVersion: 'authentication.k8s.io/v1',
        kind: 'TokenRequest'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.authentication.v1.TokenRequest".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeTokenRequest.GVK,
            ...toJson_KubeTokenRequestProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.authentication.v1.TokenRequest" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeTokenRequest.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeTokenRequest.GVK,
            ...toJson_KubeTokenRequestProps(resolved)
        };
    }
}
exports.KubeTokenRequest = KubeTokenRequest;
/**
 * TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver.
 *
 * @schema io.k8s.api.authentication.v1.TokenReview
 */
class KubeTokenReview extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.authentication.v1.TokenReview"
     */
    static GVK = {
        apiVersion: 'authentication.k8s.io/v1',
        kind: 'TokenReview'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.authentication.v1.TokenReview".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeTokenReview.GVK,
            ...toJson_KubeTokenReviewProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.authentication.v1.TokenReview" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeTokenReview.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeTokenReview.GVK,
            ...toJson_KubeTokenReviewProps(resolved)
        };
    }
}
exports.KubeTokenReview = KubeTokenReview;
/**
 * LocalSubjectAccessReview checks whether or not a user or group can perform an action in a given namespace. Having a namespace scoped resource makes it much easier to grant namespace scoped policy that includes permissions checking.
 *
 * @schema io.k8s.api.authorization.v1.LocalSubjectAccessReview
 */
class KubeLocalSubjectAccessReview extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.authorization.v1.LocalSubjectAccessReview"
     */
    static GVK = {
        apiVersion: 'authorization.k8s.io/v1',
        kind: 'LocalSubjectAccessReview'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.authorization.v1.LocalSubjectAccessReview".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeLocalSubjectAccessReview.GVK,
            ...toJson_KubeLocalSubjectAccessReviewProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.authorization.v1.LocalSubjectAccessReview" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeLocalSubjectAccessReview.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeLocalSubjectAccessReview.GVK,
            ...toJson_KubeLocalSubjectAccessReviewProps(resolved)
        };
    }
}
exports.KubeLocalSubjectAccessReview = KubeLocalSubjectAccessReview;
/**
 * SelfSubjectAccessReview checks whether or the current user can perform an action.  Not filling in a spec.namespace means "in all namespaces".  Self is a special case, because users should always be able to check whether they can perform an action
 *
 * @schema io.k8s.api.authorization.v1.SelfSubjectAccessReview
 */
class KubeSelfSubjectAccessReview extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.authorization.v1.SelfSubjectAccessReview"
     */
    static GVK = {
        apiVersion: 'authorization.k8s.io/v1',
        kind: 'SelfSubjectAccessReview'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.authorization.v1.SelfSubjectAccessReview".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeSelfSubjectAccessReview.GVK,
            ...toJson_KubeSelfSubjectAccessReviewProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.authorization.v1.SelfSubjectAccessReview" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeSelfSubjectAccessReview.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeSelfSubjectAccessReview.GVK,
            ...toJson_KubeSelfSubjectAccessReviewProps(resolved)
        };
    }
}
exports.KubeSelfSubjectAccessReview = KubeSelfSubjectAccessReview;
/**
 * SelfSubjectRulesReview enumerates the set of actions the current user can perform within a namespace. The returned list of actions may be incomplete depending on the server's authorization mode, and any errors experienced during the evaluation. SelfSubjectRulesReview should be used by UIs to show/hide actions, or to quickly let an end user reason about their permissions. It should NOT Be used by external systems to drive authorization decisions as this raises confused deputy, cache lifetime/revocation, and correctness concerns. SubjectAccessReview, and LocalAccessReview are the correct way to defer authorization decisions to the API server.
 *
 * @schema io.k8s.api.authorization.v1.SelfSubjectRulesReview
 */
class KubeSelfSubjectRulesReview extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.authorization.v1.SelfSubjectRulesReview"
     */
    static GVK = {
        apiVersion: 'authorization.k8s.io/v1',
        kind: 'SelfSubjectRulesReview'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.authorization.v1.SelfSubjectRulesReview".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeSelfSubjectRulesReview.GVK,
            ...toJson_KubeSelfSubjectRulesReviewProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.authorization.v1.SelfSubjectRulesReview" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeSelfSubjectRulesReview.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeSelfSubjectRulesReview.GVK,
            ...toJson_KubeSelfSubjectRulesReviewProps(resolved)
        };
    }
}
exports.KubeSelfSubjectRulesReview = KubeSelfSubjectRulesReview;
/**
 * SubjectAccessReview checks whether or not a user or group can perform an action.
 *
 * @schema io.k8s.api.authorization.v1.SubjectAccessReview
 */
class KubeSubjectAccessReview extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.authorization.v1.SubjectAccessReview"
     */
    static GVK = {
        apiVersion: 'authorization.k8s.io/v1',
        kind: 'SubjectAccessReview'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.authorization.v1.SubjectAccessReview".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeSubjectAccessReview.GVK,
            ...toJson_KubeSubjectAccessReviewProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.authorization.v1.SubjectAccessReview" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeSubjectAccessReview.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeSubjectAccessReview.GVK,
            ...toJson_KubeSubjectAccessReviewProps(resolved)
        };
    }
}
exports.KubeSubjectAccessReview = KubeSubjectAccessReview;
/**
 * configuration of a horizontal pod autoscaler.
 *
 * @schema io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler
 */
class KubeHorizontalPodAutoscaler extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler"
     */
    static GVK = {
        apiVersion: 'autoscaling/v1',
        kind: 'HorizontalPodAutoscaler'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeHorizontalPodAutoscaler.GVK,
            ...toJson_KubeHorizontalPodAutoscalerProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeHorizontalPodAutoscaler.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeHorizontalPodAutoscaler.GVK,
            ...toJson_KubeHorizontalPodAutoscalerProps(resolved)
        };
    }
}
exports.KubeHorizontalPodAutoscaler = KubeHorizontalPodAutoscaler;
/**
 * list of horizontal pod autoscaler objects.
 *
 * @schema io.k8s.api.autoscaling.v1.HorizontalPodAutoscalerList
 */
class KubeHorizontalPodAutoscalerList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v1.HorizontalPodAutoscalerList"
     */
    static GVK = {
        apiVersion: 'autoscaling/v1',
        kind: 'HorizontalPodAutoscalerList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v1.HorizontalPodAutoscalerList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeHorizontalPodAutoscalerList.GVK,
            ...toJson_KubeHorizontalPodAutoscalerListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v1.HorizontalPodAutoscalerList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeHorizontalPodAutoscalerList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeHorizontalPodAutoscalerList.GVK,
            ...toJson_KubeHorizontalPodAutoscalerListProps(resolved)
        };
    }
}
exports.KubeHorizontalPodAutoscalerList = KubeHorizontalPodAutoscalerList;
/**
 * Scale represents a scaling request for a resource.
 *
 * @schema io.k8s.api.autoscaling.v1.Scale
 */
class KubeScale extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v1.Scale"
     */
    static GVK = {
        apiVersion: 'autoscaling/v1',
        kind: 'Scale'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v1.Scale".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeScale.GVK,
            ...toJson_KubeScaleProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v1.Scale" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeScale.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeScale.GVK,
            ...toJson_KubeScaleProps(resolved)
        };
    }
}
exports.KubeScale = KubeScale;
/**
 * HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.
 *
 * @schema io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler
 */
class KubeHorizontalPodAutoscalerV2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler"
     */
    static GVK = {
        apiVersion: 'autoscaling/v2',
        kind: 'HorizontalPodAutoscaler'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeHorizontalPodAutoscalerV2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerV2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v2.HorizontalPodAutoscaler" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeHorizontalPodAutoscalerV2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeHorizontalPodAutoscalerV2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerV2Props(resolved)
        };
    }
}
exports.KubeHorizontalPodAutoscalerV2 = KubeHorizontalPodAutoscalerV2;
/**
 * HorizontalPodAutoscalerList is a list of horizontal pod autoscaler objects.
 *
 * @schema io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerList
 */
class KubeHorizontalPodAutoscalerListV2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerList"
     */
    static GVK = {
        apiVersion: 'autoscaling/v2',
        kind: 'HorizontalPodAutoscalerList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeHorizontalPodAutoscalerListV2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerListV2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v2.HorizontalPodAutoscalerList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeHorizontalPodAutoscalerListV2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeHorizontalPodAutoscalerListV2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerListV2Props(resolved)
        };
    }
}
exports.KubeHorizontalPodAutoscalerListV2 = KubeHorizontalPodAutoscalerListV2;
/**
 * HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.
 *
 * @schema io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler
 */
class KubeHorizontalPodAutoscalerV2Beta2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler"
     */
    static GVK = {
        apiVersion: 'autoscaling/v2beta2',
        kind: 'HorizontalPodAutoscaler'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeHorizontalPodAutoscalerV2Beta2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerV2Beta2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscaler" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeHorizontalPodAutoscalerV2Beta2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeHorizontalPodAutoscalerV2Beta2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerV2Beta2Props(resolved)
        };
    }
}
exports.KubeHorizontalPodAutoscalerV2Beta2 = KubeHorizontalPodAutoscalerV2Beta2;
/**
 * HorizontalPodAutoscalerList is a list of horizontal pod autoscaler objects.
 *
 * @schema io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerList
 */
class KubeHorizontalPodAutoscalerListV2Beta2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerList"
     */
    static GVK = {
        apiVersion: 'autoscaling/v2beta2',
        kind: 'HorizontalPodAutoscalerList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeHorizontalPodAutoscalerListV2Beta2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerListV2Beta2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.autoscaling.v2beta2.HorizontalPodAutoscalerList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeHorizontalPodAutoscalerListV2Beta2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeHorizontalPodAutoscalerListV2Beta2.GVK,
            ...toJson_KubeHorizontalPodAutoscalerListV2Beta2Props(resolved)
        };
    }
}
exports.KubeHorizontalPodAutoscalerListV2Beta2 = KubeHorizontalPodAutoscalerListV2Beta2;
/**
 * CronJob represents the configuration of a single cron job.
 *
 * @schema io.k8s.api.batch.v1.CronJob
 */
class KubeCronJob extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.batch.v1.CronJob"
     */
    static GVK = {
        apiVersion: 'batch/v1',
        kind: 'CronJob'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.batch.v1.CronJob".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeCronJob.GVK,
            ...toJson_KubeCronJobProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.batch.v1.CronJob" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeCronJob.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCronJob.GVK,
            ...toJson_KubeCronJobProps(resolved)
        };
    }
}
exports.KubeCronJob = KubeCronJob;
/**
 * CronJobList is a collection of cron jobs.
 *
 * @schema io.k8s.api.batch.v1.CronJobList
 */
class KubeCronJobList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.batch.v1.CronJobList"
     */
    static GVK = {
        apiVersion: 'batch/v1',
        kind: 'CronJobList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.batch.v1.CronJobList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCronJobList.GVK,
            ...toJson_KubeCronJobListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.batch.v1.CronJobList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCronJobList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCronJobList.GVK,
            ...toJson_KubeCronJobListProps(resolved)
        };
    }
}
exports.KubeCronJobList = KubeCronJobList;
/**
 * Job represents the configuration of a single job.
 *
 * @schema io.k8s.api.batch.v1.Job
 */
class KubeJob extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.batch.v1.Job"
     */
    static GVK = {
        apiVersion: 'batch/v1',
        kind: 'Job'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.batch.v1.Job".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeJob.GVK,
            ...toJson_KubeJobProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.batch.v1.Job" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeJob.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeJob.GVK,
            ...toJson_KubeJobProps(resolved)
        };
    }
}
exports.KubeJob = KubeJob;
/**
 * JobList is a collection of jobs.
 *
 * @schema io.k8s.api.batch.v1.JobList
 */
class KubeJobList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.batch.v1.JobList"
     */
    static GVK = {
        apiVersion: 'batch/v1',
        kind: 'JobList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.batch.v1.JobList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeJobList.GVK,
            ...toJson_KubeJobListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.batch.v1.JobList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeJobList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeJobList.GVK,
            ...toJson_KubeJobListProps(resolved)
        };
    }
}
exports.KubeJobList = KubeJobList;
/**
 * CertificateSigningRequest objects provide a mechanism to obtain x509 certificates by submitting a certificate signing request, and having it asynchronously approved and issued.

Kubelets use this API to obtain:
 1. client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client-kubelet" signerName).
 2. serving certificates for TLS endpoints kube-apiserver can connect to securely (with the "kubernetes.io/kubelet-serving" signerName).

This API can be used to request client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client" signerName), or to obtain certificates from custom non-Kubernetes signers.
 *
 * @schema io.k8s.api.certificates.v1.CertificateSigningRequest
 */
class KubeCertificateSigningRequest extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.certificates.v1.CertificateSigningRequest"
     */
    static GVK = {
        apiVersion: 'certificates.k8s.io/v1',
        kind: 'CertificateSigningRequest'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.certificates.v1.CertificateSigningRequest".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCertificateSigningRequest.GVK,
            ...toJson_KubeCertificateSigningRequestProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.certificates.v1.CertificateSigningRequest" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCertificateSigningRequest.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCertificateSigningRequest.GVK,
            ...toJson_KubeCertificateSigningRequestProps(resolved)
        };
    }
}
exports.KubeCertificateSigningRequest = KubeCertificateSigningRequest;
/**
 * CertificateSigningRequestList is a collection of CertificateSigningRequest objects
 *
 * @schema io.k8s.api.certificates.v1.CertificateSigningRequestList
 */
class KubeCertificateSigningRequestList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.certificates.v1.CertificateSigningRequestList"
     */
    static GVK = {
        apiVersion: 'certificates.k8s.io/v1',
        kind: 'CertificateSigningRequestList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.certificates.v1.CertificateSigningRequestList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCertificateSigningRequestList.GVK,
            ...toJson_KubeCertificateSigningRequestListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.certificates.v1.CertificateSigningRequestList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCertificateSigningRequestList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCertificateSigningRequestList.GVK,
            ...toJson_KubeCertificateSigningRequestListProps(resolved)
        };
    }
}
exports.KubeCertificateSigningRequestList = KubeCertificateSigningRequestList;
/**
 * Lease defines a lease concept.
 *
 * @schema io.k8s.api.coordination.v1.Lease
 */
class KubeLease extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.coordination.v1.Lease"
     */
    static GVK = {
        apiVersion: 'coordination.k8s.io/v1',
        kind: 'Lease'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.coordination.v1.Lease".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeLease.GVK,
            ...toJson_KubeLeaseProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.coordination.v1.Lease" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeLease.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeLease.GVK,
            ...toJson_KubeLeaseProps(resolved)
        };
    }
}
exports.KubeLease = KubeLease;
/**
 * LeaseList is a list of Lease objects.
 *
 * @schema io.k8s.api.coordination.v1.LeaseList
 */
class KubeLeaseList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.coordination.v1.LeaseList"
     */
    static GVK = {
        apiVersion: 'coordination.k8s.io/v1',
        kind: 'LeaseList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.coordination.v1.LeaseList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeLeaseList.GVK,
            ...toJson_KubeLeaseListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.coordination.v1.LeaseList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeLeaseList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeLeaseList.GVK,
            ...toJson_KubeLeaseListProps(resolved)
        };
    }
}
exports.KubeLeaseList = KubeLeaseList;
/**
 * Binding ties one object to another; for example, a pod is bound to a node by a scheduler. Deprecated in 1.7, please use the bindings subresource of pods instead.
 *
 * @schema io.k8s.api.core.v1.Binding
 */
class KubeBinding extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Binding"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Binding'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Binding".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeBinding.GVK,
            ...toJson_KubeBindingProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Binding" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeBinding.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeBinding.GVK,
            ...toJson_KubeBindingProps(resolved)
        };
    }
}
exports.KubeBinding = KubeBinding;
/**
 * ComponentStatus (and ComponentStatusList) holds the cluster validation info. Deprecated: This API is deprecated in v1.19+
 *
 * @schema io.k8s.api.core.v1.ComponentStatus
 */
class KubeComponentStatus extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ComponentStatus"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ComponentStatus'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ComponentStatus".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeComponentStatus.GVK,
            ...toJson_KubeComponentStatusProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ComponentStatus" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeComponentStatus.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeComponentStatus.GVK,
            ...toJson_KubeComponentStatusProps(resolved)
        };
    }
}
exports.KubeComponentStatus = KubeComponentStatus;
/**
 * Status of all the conditions for the component as a list of ComponentStatus objects. Deprecated: This API is deprecated in v1.19+
 *
 * @schema io.k8s.api.core.v1.ComponentStatusList
 */
class KubeComponentStatusList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ComponentStatusList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ComponentStatusList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ComponentStatusList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeComponentStatusList.GVK,
            ...toJson_KubeComponentStatusListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ComponentStatusList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeComponentStatusList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeComponentStatusList.GVK,
            ...toJson_KubeComponentStatusListProps(resolved)
        };
    }
}
exports.KubeComponentStatusList = KubeComponentStatusList;
/**
 * ConfigMap holds configuration data for pods to consume.
 *
 * @schema io.k8s.api.core.v1.ConfigMap
 */
class KubeConfigMap extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ConfigMap"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ConfigMap'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ConfigMap".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeConfigMap.GVK,
            ...toJson_KubeConfigMapProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ConfigMap" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeConfigMap.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeConfigMap.GVK,
            ...toJson_KubeConfigMapProps(resolved)
        };
    }
}
exports.KubeConfigMap = KubeConfigMap;
/**
 * ConfigMapList is a resource containing a list of ConfigMap objects.
 *
 * @schema io.k8s.api.core.v1.ConfigMapList
 */
class KubeConfigMapList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ConfigMapList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ConfigMapList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ConfigMapList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeConfigMapList.GVK,
            ...toJson_KubeConfigMapListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ConfigMapList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeConfigMapList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeConfigMapList.GVK,
            ...toJson_KubeConfigMapListProps(resolved)
        };
    }
}
exports.KubeConfigMapList = KubeConfigMapList;
/**
 * Endpoints is a collection of endpoints that implement the actual service. Example:

     Name: "mysvc",
     Subsets: [
       {
         Addresses: [{"ip": "10.10.1.1"}, {"ip": "10.10.2.2"}],
         Ports: [{"name": "a", "port": 8675}, {"name": "b", "port": 309}]
       },
       {
         Addresses: [{"ip": "10.10.3.3"}],
         Ports: [{"name": "a", "port": 93}, {"name": "b", "port": 76}]
       },
    ]
 *
 * @schema io.k8s.api.core.v1.Endpoints
 */
class KubeEndpoints extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Endpoints"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Endpoints'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Endpoints".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeEndpoints.GVK,
            ...toJson_KubeEndpointsProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Endpoints" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeEndpoints.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEndpoints.GVK,
            ...toJson_KubeEndpointsProps(resolved)
        };
    }
}
exports.KubeEndpoints = KubeEndpoints;
/**
 * EndpointsList is a list of endpoints.
 *
 * @schema io.k8s.api.core.v1.EndpointsList
 */
class KubeEndpointsList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.EndpointsList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'EndpointsList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.EndpointsList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeEndpointsList.GVK,
            ...toJson_KubeEndpointsListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.EndpointsList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeEndpointsList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEndpointsList.GVK,
            ...toJson_KubeEndpointsListProps(resolved)
        };
    }
}
exports.KubeEndpointsList = KubeEndpointsList;
/**
 * Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.
 *
 * @schema io.k8s.api.events.v1.Event
 */
class KubeEvent extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.events.v1.Event"
     */
    static GVK = {
        apiVersion: 'events.k8s.io/v1',
        kind: 'Event'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.events.v1.Event".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeEvent.GVK,
            ...toJson_KubeEventProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.events.v1.Event" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeEvent.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEvent.GVK,
            ...toJson_KubeEventProps(resolved)
        };
    }
}
exports.KubeEvent = KubeEvent;
/**
 * EventList is a list of Event objects.
 *
 * @schema io.k8s.api.events.v1.EventList
 */
class KubeEventList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.events.v1.EventList"
     */
    static GVK = {
        apiVersion: 'events.k8s.io/v1',
        kind: 'EventList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.events.v1.EventList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeEventList.GVK,
            ...toJson_KubeEventListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.events.v1.EventList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeEventList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEventList.GVK,
            ...toJson_KubeEventListProps(resolved)
        };
    }
}
exports.KubeEventList = KubeEventList;
/**
 * LimitRange sets resource usage limits for each kind of resource in a Namespace.
 *
 * @schema io.k8s.api.core.v1.LimitRange
 */
class KubeLimitRange extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.LimitRange"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'LimitRange'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.LimitRange".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeLimitRange.GVK,
            ...toJson_KubeLimitRangeProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.LimitRange" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeLimitRange.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeLimitRange.GVK,
            ...toJson_KubeLimitRangeProps(resolved)
        };
    }
}
exports.KubeLimitRange = KubeLimitRange;
/**
 * LimitRangeList is a list of LimitRange items.
 *
 * @schema io.k8s.api.core.v1.LimitRangeList
 */
class KubeLimitRangeList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.LimitRangeList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'LimitRangeList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.LimitRangeList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeLimitRangeList.GVK,
            ...toJson_KubeLimitRangeListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.LimitRangeList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeLimitRangeList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeLimitRangeList.GVK,
            ...toJson_KubeLimitRangeListProps(resolved)
        };
    }
}
exports.KubeLimitRangeList = KubeLimitRangeList;
/**
 * Namespace provides a scope for Names. Use of multiple namespaces is optional.
 *
 * @schema io.k8s.api.core.v1.Namespace
 */
class KubeNamespace extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Namespace"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Namespace'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Namespace".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeNamespace.GVK,
            ...toJson_KubeNamespaceProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Namespace" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeNamespace.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeNamespace.GVK,
            ...toJson_KubeNamespaceProps(resolved)
        };
    }
}
exports.KubeNamespace = KubeNamespace;
/**
 * NamespaceList is a list of Namespaces.
 *
 * @schema io.k8s.api.core.v1.NamespaceList
 */
class KubeNamespaceList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.NamespaceList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'NamespaceList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.NamespaceList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeNamespaceList.GVK,
            ...toJson_KubeNamespaceListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.NamespaceList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeNamespaceList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeNamespaceList.GVK,
            ...toJson_KubeNamespaceListProps(resolved)
        };
    }
}
exports.KubeNamespaceList = KubeNamespaceList;
/**
 * Node is a worker node in Kubernetes. Each node will have a unique identifier in the cache (i.e. in etcd).
 *
 * @schema io.k8s.api.core.v1.Node
 */
class KubeNode extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Node"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Node'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Node".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeNode.GVK,
            ...toJson_KubeNodeProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Node" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeNode.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeNode.GVK,
            ...toJson_KubeNodeProps(resolved)
        };
    }
}
exports.KubeNode = KubeNode;
/**
 * NodeList is the whole list of all Nodes which have been registered with master.
 *
 * @schema io.k8s.api.core.v1.NodeList
 */
class KubeNodeList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.NodeList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'NodeList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.NodeList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeNodeList.GVK,
            ...toJson_KubeNodeListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.NodeList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeNodeList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeNodeList.GVK,
            ...toJson_KubeNodeListProps(resolved)
        };
    }
}
exports.KubeNodeList = KubeNodeList;
/**
 * PersistentVolume (PV) is a storage resource provisioned by an administrator. It is analogous to a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes
 *
 * @schema io.k8s.api.core.v1.PersistentVolume
 */
class KubePersistentVolume extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PersistentVolume"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PersistentVolume'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PersistentVolume".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePersistentVolume.GVK,
            ...toJson_KubePersistentVolumeProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PersistentVolume" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePersistentVolume.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePersistentVolume.GVK,
            ...toJson_KubePersistentVolumeProps(resolved)
        };
    }
}
exports.KubePersistentVolume = KubePersistentVolume;
/**
 * PersistentVolumeClaim is a user's request for and claim to a persistent volume
 *
 * @schema io.k8s.api.core.v1.PersistentVolumeClaim
 */
class KubePersistentVolumeClaim extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PersistentVolumeClaim"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaim'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PersistentVolumeClaim".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePersistentVolumeClaim.GVK,
            ...toJson_KubePersistentVolumeClaimProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PersistentVolumeClaim" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePersistentVolumeClaim.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePersistentVolumeClaim.GVK,
            ...toJson_KubePersistentVolumeClaimProps(resolved)
        };
    }
}
exports.KubePersistentVolumeClaim = KubePersistentVolumeClaim;
/**
 * PersistentVolumeClaimList is a list of PersistentVolumeClaim items.
 *
 * @schema io.k8s.api.core.v1.PersistentVolumeClaimList
 */
class KubePersistentVolumeClaimList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PersistentVolumeClaimList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaimList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PersistentVolumeClaimList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePersistentVolumeClaimList.GVK,
            ...toJson_KubePersistentVolumeClaimListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PersistentVolumeClaimList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePersistentVolumeClaimList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePersistentVolumeClaimList.GVK,
            ...toJson_KubePersistentVolumeClaimListProps(resolved)
        };
    }
}
exports.KubePersistentVolumeClaimList = KubePersistentVolumeClaimList;
/**
 * PersistentVolumeList is a list of PersistentVolume items.
 *
 * @schema io.k8s.api.core.v1.PersistentVolumeList
 */
class KubePersistentVolumeList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PersistentVolumeList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PersistentVolumeList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PersistentVolumeList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePersistentVolumeList.GVK,
            ...toJson_KubePersistentVolumeListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PersistentVolumeList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePersistentVolumeList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePersistentVolumeList.GVK,
            ...toJson_KubePersistentVolumeListProps(resolved)
        };
    }
}
exports.KubePersistentVolumeList = KubePersistentVolumeList;
/**
 * Pod is a collection of containers that can run on a host. This resource is created by clients and scheduled onto hosts.
 *
 * @schema io.k8s.api.core.v1.Pod
 */
class KubePod extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Pod"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Pod'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Pod".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePod.GVK,
            ...toJson_KubePodProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Pod" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePod.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePod.GVK,
            ...toJson_KubePodProps(resolved)
        };
    }
}
exports.KubePod = KubePod;
/**
 * PodList is a list of Pods.
 *
 * @schema io.k8s.api.core.v1.PodList
 */
class KubePodList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PodList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PodList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PodList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePodList.GVK,
            ...toJson_KubePodListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PodList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePodList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePodList.GVK,
            ...toJson_KubePodListProps(resolved)
        };
    }
}
exports.KubePodList = KubePodList;
/**
 * PodTemplate describes a template for creating copies of a predefined pod.
 *
 * @schema io.k8s.api.core.v1.PodTemplate
 */
class KubePodTemplate extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PodTemplate"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PodTemplate'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PodTemplate".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePodTemplate.GVK,
            ...toJson_KubePodTemplateProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PodTemplate" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePodTemplate.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePodTemplate.GVK,
            ...toJson_KubePodTemplateProps(resolved)
        };
    }
}
exports.KubePodTemplate = KubePodTemplate;
/**
 * PodTemplateList is a list of PodTemplates.
 *
 * @schema io.k8s.api.core.v1.PodTemplateList
 */
class KubePodTemplateList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.PodTemplateList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'PodTemplateList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.PodTemplateList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePodTemplateList.GVK,
            ...toJson_KubePodTemplateListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.PodTemplateList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePodTemplateList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePodTemplateList.GVK,
            ...toJson_KubePodTemplateListProps(resolved)
        };
    }
}
exports.KubePodTemplateList = KubePodTemplateList;
/**
 * ReplicationController represents the configuration of a replication controller.
 *
 * @schema io.k8s.api.core.v1.ReplicationController
 */
class KubeReplicationController extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ReplicationController"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ReplicationController'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ReplicationController".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeReplicationController.GVK,
            ...toJson_KubeReplicationControllerProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ReplicationController" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeReplicationController.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeReplicationController.GVK,
            ...toJson_KubeReplicationControllerProps(resolved)
        };
    }
}
exports.KubeReplicationController = KubeReplicationController;
/**
 * ReplicationControllerList is a collection of replication controllers.
 *
 * @schema io.k8s.api.core.v1.ReplicationControllerList
 */
class KubeReplicationControllerList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ReplicationControllerList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ReplicationControllerList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ReplicationControllerList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeReplicationControllerList.GVK,
            ...toJson_KubeReplicationControllerListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ReplicationControllerList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeReplicationControllerList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeReplicationControllerList.GVK,
            ...toJson_KubeReplicationControllerListProps(resolved)
        };
    }
}
exports.KubeReplicationControllerList = KubeReplicationControllerList;
/**
 * ResourceQuota sets aggregate quota restrictions enforced per namespace
 *
 * @schema io.k8s.api.core.v1.ResourceQuota
 */
class KubeResourceQuota extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ResourceQuota"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ResourceQuota'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ResourceQuota".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeResourceQuota.GVK,
            ...toJson_KubeResourceQuotaProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ResourceQuota" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeResourceQuota.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeResourceQuota.GVK,
            ...toJson_KubeResourceQuotaProps(resolved)
        };
    }
}
exports.KubeResourceQuota = KubeResourceQuota;
/**
 * ResourceQuotaList is a list of ResourceQuota items.
 *
 * @schema io.k8s.api.core.v1.ResourceQuotaList
 */
class KubeResourceQuotaList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ResourceQuotaList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ResourceQuotaList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ResourceQuotaList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeResourceQuotaList.GVK,
            ...toJson_KubeResourceQuotaListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ResourceQuotaList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeResourceQuotaList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeResourceQuotaList.GVK,
            ...toJson_KubeResourceQuotaListProps(resolved)
        };
    }
}
exports.KubeResourceQuotaList = KubeResourceQuotaList;
/**
 * Secret holds secret data of a certain type. The total bytes of the values in the Data field must be less than MaxSecretSize bytes.
 *
 * @schema io.k8s.api.core.v1.Secret
 */
class KubeSecret extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Secret"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Secret'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Secret".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeSecret.GVK,
            ...toJson_KubeSecretProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Secret" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeSecret.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeSecret.GVK,
            ...toJson_KubeSecretProps(resolved)
        };
    }
}
exports.KubeSecret = KubeSecret;
/**
 * SecretList is a list of Secret.
 *
 * @schema io.k8s.api.core.v1.SecretList
 */
class KubeSecretList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.SecretList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'SecretList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.SecretList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeSecretList.GVK,
            ...toJson_KubeSecretListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.SecretList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeSecretList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeSecretList.GVK,
            ...toJson_KubeSecretListProps(resolved)
        };
    }
}
exports.KubeSecretList = KubeSecretList;
/**
 * Service is a named abstraction of software service (for example, mysql) consisting of local port (for example 3306) that the proxy listens on, and the selector that determines which pods will answer requests sent through the proxy.
 *
 * @schema io.k8s.api.core.v1.Service
 */
class KubeService extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.Service"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Service'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.Service".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeService.GVK,
            ...toJson_KubeServiceProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.Service" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeService.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeService.GVK,
            ...toJson_KubeServiceProps(resolved)
        };
    }
}
exports.KubeService = KubeService;
/**
 * ServiceAccount binds together: * a name, understood by users, and perhaps by peripheral systems, for an identity * a principal that can be authenticated and authorized * a set of secrets
 *
 * @schema io.k8s.api.core.v1.ServiceAccount
 */
class KubeServiceAccount extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ServiceAccount"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ServiceAccount'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ServiceAccount".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeServiceAccount.GVK,
            ...toJson_KubeServiceAccountProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ServiceAccount" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeServiceAccount.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeServiceAccount.GVK,
            ...toJson_KubeServiceAccountProps(resolved)
        };
    }
}
exports.KubeServiceAccount = KubeServiceAccount;
/**
 * ServiceAccountList is a list of ServiceAccount objects
 *
 * @schema io.k8s.api.core.v1.ServiceAccountList
 */
class KubeServiceAccountList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ServiceAccountList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ServiceAccountList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ServiceAccountList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeServiceAccountList.GVK,
            ...toJson_KubeServiceAccountListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ServiceAccountList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeServiceAccountList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeServiceAccountList.GVK,
            ...toJson_KubeServiceAccountListProps(resolved)
        };
    }
}
exports.KubeServiceAccountList = KubeServiceAccountList;
/**
 * ServiceList holds a list of services.
 *
 * @schema io.k8s.api.core.v1.ServiceList
 */
class KubeServiceList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.core.v1.ServiceList"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'ServiceList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.core.v1.ServiceList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeServiceList.GVK,
            ...toJson_KubeServiceListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.core.v1.ServiceList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeServiceList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeServiceList.GVK,
            ...toJson_KubeServiceListProps(resolved)
        };
    }
}
exports.KubeServiceList = KubeServiceList;
/**
 * EndpointSlice represents a subset of the endpoints that implement a service. For a given service there may be multiple EndpointSlice objects, selected by labels, which must be joined to produce the full set of endpoints.
 *
 * @schema io.k8s.api.discovery.v1.EndpointSlice
 */
class KubeEndpointSlice extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.discovery.v1.EndpointSlice"
     */
    static GVK = {
        apiVersion: 'discovery.k8s.io/v1',
        kind: 'EndpointSlice'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.discovery.v1.EndpointSlice".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeEndpointSlice.GVK,
            ...toJson_KubeEndpointSliceProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.discovery.v1.EndpointSlice" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeEndpointSlice.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEndpointSlice.GVK,
            ...toJson_KubeEndpointSliceProps(resolved)
        };
    }
}
exports.KubeEndpointSlice = KubeEndpointSlice;
/**
 * EndpointSliceList represents a list of endpoint slices
 *
 * @schema io.k8s.api.discovery.v1.EndpointSliceList
 */
class KubeEndpointSliceList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.discovery.v1.EndpointSliceList"
     */
    static GVK = {
        apiVersion: 'discovery.k8s.io/v1',
        kind: 'EndpointSliceList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.discovery.v1.EndpointSliceList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeEndpointSliceList.GVK,
            ...toJson_KubeEndpointSliceListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.discovery.v1.EndpointSliceList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeEndpointSliceList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEndpointSliceList.GVK,
            ...toJson_KubeEndpointSliceListProps(resolved)
        };
    }
}
exports.KubeEndpointSliceList = KubeEndpointSliceList;
/**
 * FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher".
 *
 * @schema io.k8s.api.flowcontrol.v1beta1.FlowSchema
 */
class KubeFlowSchemaV1Beta1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta1.FlowSchema"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta1',
        kind: 'FlowSchema'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta1.FlowSchema".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeFlowSchemaV1Beta1.GVK,
            ...toJson_KubeFlowSchemaV1Beta1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta1.FlowSchema" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeFlowSchemaV1Beta1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeFlowSchemaV1Beta1.GVK,
            ...toJson_KubeFlowSchemaV1Beta1Props(resolved)
        };
    }
}
exports.KubeFlowSchemaV1Beta1 = KubeFlowSchemaV1Beta1;
/**
 * FlowSchemaList is a list of FlowSchema objects.
 *
 * @schema io.k8s.api.flowcontrol.v1beta1.FlowSchemaList
 */
class KubeFlowSchemaListV1Beta1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta1.FlowSchemaList"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta1',
        kind: 'FlowSchemaList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta1.FlowSchemaList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeFlowSchemaListV1Beta1.GVK,
            ...toJson_KubeFlowSchemaListV1Beta1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta1.FlowSchemaList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeFlowSchemaListV1Beta1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeFlowSchemaListV1Beta1.GVK,
            ...toJson_KubeFlowSchemaListV1Beta1Props(resolved)
        };
    }
}
exports.KubeFlowSchemaListV1Beta1 = KubeFlowSchemaListV1Beta1;
/**
 * PriorityLevelConfiguration represents the configuration of a priority level.
 *
 * @schema io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration
 */
class KubePriorityLevelConfigurationV1Beta1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta1',
        kind: 'PriorityLevelConfiguration'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePriorityLevelConfigurationV1Beta1.GVK,
            ...toJson_KubePriorityLevelConfigurationV1Beta1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfiguration" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePriorityLevelConfigurationV1Beta1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePriorityLevelConfigurationV1Beta1.GVK,
            ...toJson_KubePriorityLevelConfigurationV1Beta1Props(resolved)
        };
    }
}
exports.KubePriorityLevelConfigurationV1Beta1 = KubePriorityLevelConfigurationV1Beta1;
/**
 * PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects.
 *
 * @schema io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationList
 */
class KubePriorityLevelConfigurationListV1Beta1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationList"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta1',
        kind: 'PriorityLevelConfigurationList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePriorityLevelConfigurationListV1Beta1.GVK,
            ...toJson_KubePriorityLevelConfigurationListV1Beta1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta1.PriorityLevelConfigurationList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePriorityLevelConfigurationListV1Beta1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePriorityLevelConfigurationListV1Beta1.GVK,
            ...toJson_KubePriorityLevelConfigurationListV1Beta1Props(resolved)
        };
    }
}
exports.KubePriorityLevelConfigurationListV1Beta1 = KubePriorityLevelConfigurationListV1Beta1;
/**
 * FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher".
 *
 * @schema io.k8s.api.flowcontrol.v1beta2.FlowSchema
 */
class KubeFlowSchemaV1Beta2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta2.FlowSchema"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta2',
        kind: 'FlowSchema'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta2.FlowSchema".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeFlowSchemaV1Beta2.GVK,
            ...toJson_KubeFlowSchemaV1Beta2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta2.FlowSchema" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeFlowSchemaV1Beta2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeFlowSchemaV1Beta2.GVK,
            ...toJson_KubeFlowSchemaV1Beta2Props(resolved)
        };
    }
}
exports.KubeFlowSchemaV1Beta2 = KubeFlowSchemaV1Beta2;
/**
 * FlowSchemaList is a list of FlowSchema objects.
 *
 * @schema io.k8s.api.flowcontrol.v1beta2.FlowSchemaList
 */
class KubeFlowSchemaListV1Beta2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta2.FlowSchemaList"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta2',
        kind: 'FlowSchemaList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta2.FlowSchemaList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeFlowSchemaListV1Beta2.GVK,
            ...toJson_KubeFlowSchemaListV1Beta2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta2.FlowSchemaList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeFlowSchemaListV1Beta2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeFlowSchemaListV1Beta2.GVK,
            ...toJson_KubeFlowSchemaListV1Beta2Props(resolved)
        };
    }
}
exports.KubeFlowSchemaListV1Beta2 = KubeFlowSchemaListV1Beta2;
/**
 * PriorityLevelConfiguration represents the configuration of a priority level.
 *
 * @schema io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfiguration
 */
class KubePriorityLevelConfigurationV1Beta2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfiguration"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta2',
        kind: 'PriorityLevelConfiguration'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfiguration".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePriorityLevelConfigurationV1Beta2.GVK,
            ...toJson_KubePriorityLevelConfigurationV1Beta2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfiguration" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePriorityLevelConfigurationV1Beta2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePriorityLevelConfigurationV1Beta2.GVK,
            ...toJson_KubePriorityLevelConfigurationV1Beta2Props(resolved)
        };
    }
}
exports.KubePriorityLevelConfigurationV1Beta2 = KubePriorityLevelConfigurationV1Beta2;
/**
 * PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects.
 *
 * @schema io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfigurationList
 */
class KubePriorityLevelConfigurationListV1Beta2 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfigurationList"
     */
    static GVK = {
        apiVersion: 'flowcontrol.apiserver.k8s.io/v1beta2',
        kind: 'PriorityLevelConfigurationList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfigurationList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePriorityLevelConfigurationListV1Beta2.GVK,
            ...toJson_KubePriorityLevelConfigurationListV1Beta2Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.flowcontrol.v1beta2.PriorityLevelConfigurationList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePriorityLevelConfigurationListV1Beta2.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePriorityLevelConfigurationListV1Beta2.GVK,
            ...toJson_KubePriorityLevelConfigurationListV1Beta2Props(resolved)
        };
    }
}
exports.KubePriorityLevelConfigurationListV1Beta2 = KubePriorityLevelConfigurationListV1Beta2;
/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
 *
 * @schema io.k8s.api.networking.v1.Ingress
 */
class KubeIngress extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1.Ingress"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1.Ingress".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeIngress.GVK,
            ...toJson_KubeIngressProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1.Ingress" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeIngress.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeIngress.GVK,
            ...toJson_KubeIngressProps(resolved)
        };
    }
}
exports.KubeIngress = KubeIngress;
/**
 * IngressClass represents the class of the Ingress, referenced by the Ingress Spec. The `ingressclass.kubernetes.io/is-default-class` annotation can be used to indicate that an IngressClass should be considered default. When a single IngressClass resource has this annotation set to true, new Ingress resources without a class specified will be assigned this default class.
 *
 * @schema io.k8s.api.networking.v1.IngressClass
 */
class KubeIngressClass extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1.IngressClass"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'IngressClass'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1.IngressClass".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeIngressClass.GVK,
            ...toJson_KubeIngressClassProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1.IngressClass" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeIngressClass.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeIngressClass.GVK,
            ...toJson_KubeIngressClassProps(resolved)
        };
    }
}
exports.KubeIngressClass = KubeIngressClass;
/**
 * IngressClassList is a collection of IngressClasses.
 *
 * @schema io.k8s.api.networking.v1.IngressClassList
 */
class KubeIngressClassList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1.IngressClassList"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'IngressClassList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1.IngressClassList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeIngressClassList.GVK,
            ...toJson_KubeIngressClassListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1.IngressClassList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeIngressClassList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeIngressClassList.GVK,
            ...toJson_KubeIngressClassListProps(resolved)
        };
    }
}
exports.KubeIngressClassList = KubeIngressClassList;
/**
 * IngressList is a collection of Ingress.
 *
 * @schema io.k8s.api.networking.v1.IngressList
 */
class KubeIngressList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1.IngressList"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'IngressList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1.IngressList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeIngressList.GVK,
            ...toJson_KubeIngressListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1.IngressList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeIngressList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeIngressList.GVK,
            ...toJson_KubeIngressListProps(resolved)
        };
    }
}
exports.KubeIngressList = KubeIngressList;
/**
 * NetworkPolicy describes what network traffic is allowed for a set of Pods
 *
 * @schema io.k8s.api.networking.v1.NetworkPolicy
 */
class KubeNetworkPolicy extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1.NetworkPolicy"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'NetworkPolicy'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1.NetworkPolicy".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeNetworkPolicy.GVK,
            ...toJson_KubeNetworkPolicyProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1.NetworkPolicy" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeNetworkPolicy.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeNetworkPolicy.GVK,
            ...toJson_KubeNetworkPolicyProps(resolved)
        };
    }
}
exports.KubeNetworkPolicy = KubeNetworkPolicy;
/**
 * NetworkPolicyList is a list of NetworkPolicy objects.
 *
 * @schema io.k8s.api.networking.v1.NetworkPolicyList
 */
class KubeNetworkPolicyList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1.NetworkPolicyList"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'NetworkPolicyList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1.NetworkPolicyList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeNetworkPolicyList.GVK,
            ...toJson_KubeNetworkPolicyListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1.NetworkPolicyList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeNetworkPolicyList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeNetworkPolicyList.GVK,
            ...toJson_KubeNetworkPolicyListProps(resolved)
        };
    }
}
exports.KubeNetworkPolicyList = KubeNetworkPolicyList;
/**
 * ClusterCIDR represents a single configuration for per-Node Pod CIDR allocations when the MultiCIDRRangeAllocator is enabled (see the config for kube-controller-manager).  A cluster may have any number of ClusterCIDR resources, all of which will be considered when allocating a CIDR for a Node.  A ClusterCIDR is eligible to be used for a given Node when the node selector matches the node in question and has free CIDRs to allocate.  In case of multiple matching ClusterCIDR resources, the allocator will attempt to break ties using internal heuristics, but any ClusterCIDR whose node selector matches the Node may be used.
 *
 * @schema io.k8s.api.networking.v1alpha1.ClusterCIDR
 */
class KubeClusterCidrv1Alpha1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1alpha1.ClusterCIDR"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1alpha1',
        kind: 'ClusterCIDR'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1alpha1.ClusterCIDR".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeClusterCidrv1Alpha1.GVK,
            ...toJson_KubeClusterCidrv1Alpha1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1alpha1.ClusterCIDR" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeClusterCidrv1Alpha1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeClusterCidrv1Alpha1.GVK,
            ...toJson_KubeClusterCidrv1Alpha1Props(resolved)
        };
    }
}
exports.KubeClusterCidrv1Alpha1 = KubeClusterCidrv1Alpha1;
/**
 * ClusterCIDRList contains a list of ClusterCIDR.
 *
 * @schema io.k8s.api.networking.v1alpha1.ClusterCIDRList
 */
class KubeClusterCidrListV1Alpha1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.networking.v1alpha1.ClusterCIDRList"
     */
    static GVK = {
        apiVersion: 'networking.k8s.io/v1alpha1',
        kind: 'ClusterCIDRList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.networking.v1alpha1.ClusterCIDRList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeClusterCidrListV1Alpha1.GVK,
            ...toJson_KubeClusterCidrListV1Alpha1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.networking.v1alpha1.ClusterCIDRList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeClusterCidrListV1Alpha1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeClusterCidrListV1Alpha1.GVK,
            ...toJson_KubeClusterCidrListV1Alpha1Props(resolved)
        };
    }
}
exports.KubeClusterCidrListV1Alpha1 = KubeClusterCidrListV1Alpha1;
/**
 * RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://kubernetes.io/docs/concepts/containers/runtime-class/
 *
 * @schema io.k8s.api.node.v1.RuntimeClass
 */
class KubeRuntimeClass extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.node.v1.RuntimeClass"
     */
    static GVK = {
        apiVersion: 'node.k8s.io/v1',
        kind: 'RuntimeClass'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.node.v1.RuntimeClass".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeRuntimeClass.GVK,
            ...toJson_KubeRuntimeClassProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.node.v1.RuntimeClass" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeRuntimeClass.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeRuntimeClass.GVK,
            ...toJson_KubeRuntimeClassProps(resolved)
        };
    }
}
exports.KubeRuntimeClass = KubeRuntimeClass;
/**
 * RuntimeClassList is a list of RuntimeClass objects.
 *
 * @schema io.k8s.api.node.v1.RuntimeClassList
 */
class KubeRuntimeClassList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.node.v1.RuntimeClassList"
     */
    static GVK = {
        apiVersion: 'node.k8s.io/v1',
        kind: 'RuntimeClassList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.node.v1.RuntimeClassList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeRuntimeClassList.GVK,
            ...toJson_KubeRuntimeClassListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.node.v1.RuntimeClassList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeRuntimeClassList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeRuntimeClassList.GVK,
            ...toJson_KubeRuntimeClassListProps(resolved)
        };
    }
}
exports.KubeRuntimeClassList = KubeRuntimeClassList;
/**
 * Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions.
 *
 * @schema io.k8s.api.policy.v1.Eviction
 */
class KubeEviction extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.policy.v1.Eviction"
     */
    static GVK = {
        apiVersion: 'policy/v1',
        kind: 'Eviction'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.policy.v1.Eviction".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeEviction.GVK,
            ...toJson_KubeEvictionProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.policy.v1.Eviction" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeEviction.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeEviction.GVK,
            ...toJson_KubeEvictionProps(resolved)
        };
    }
}
exports.KubeEviction = KubeEviction;
/**
 * PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods
 *
 * @schema io.k8s.api.policy.v1.PodDisruptionBudget
 */
class KubePodDisruptionBudget extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.policy.v1.PodDisruptionBudget"
     */
    static GVK = {
        apiVersion: 'policy/v1',
        kind: 'PodDisruptionBudget'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.policy.v1.PodDisruptionBudget".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubePodDisruptionBudget.GVK,
            ...toJson_KubePodDisruptionBudgetProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.policy.v1.PodDisruptionBudget" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubePodDisruptionBudget.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePodDisruptionBudget.GVK,
            ...toJson_KubePodDisruptionBudgetProps(resolved)
        };
    }
}
exports.KubePodDisruptionBudget = KubePodDisruptionBudget;
/**
 * PodDisruptionBudgetList is a collection of PodDisruptionBudgets.
 *
 * @schema io.k8s.api.policy.v1.PodDisruptionBudgetList
 */
class KubePodDisruptionBudgetList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.policy.v1.PodDisruptionBudgetList"
     */
    static GVK = {
        apiVersion: 'policy/v1',
        kind: 'PodDisruptionBudgetList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.policy.v1.PodDisruptionBudgetList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePodDisruptionBudgetList.GVK,
            ...toJson_KubePodDisruptionBudgetListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.policy.v1.PodDisruptionBudgetList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePodDisruptionBudgetList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePodDisruptionBudgetList.GVK,
            ...toJson_KubePodDisruptionBudgetListProps(resolved)
        };
    }
}
exports.KubePodDisruptionBudgetList = KubePodDisruptionBudgetList;
/**
 * ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding or ClusterRoleBinding.
 *
 * @schema io.k8s.api.rbac.v1.ClusterRole
 */
class KubeClusterRole extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.ClusterRole"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'ClusterRole'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.ClusterRole".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeClusterRole.GVK,
            ...toJson_KubeClusterRoleProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.ClusterRole" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeClusterRole.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeClusterRole.GVK,
            ...toJson_KubeClusterRoleProps(resolved)
        };
    }
}
exports.KubeClusterRole = KubeClusterRole;
/**
 * ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject.
 *
 * @schema io.k8s.api.rbac.v1.ClusterRoleBinding
 */
class KubeClusterRoleBinding extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.ClusterRoleBinding"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'ClusterRoleBinding'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.ClusterRoleBinding".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeClusterRoleBinding.GVK,
            ...toJson_KubeClusterRoleBindingProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.ClusterRoleBinding" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeClusterRoleBinding.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeClusterRoleBinding.GVK,
            ...toJson_KubeClusterRoleBindingProps(resolved)
        };
    }
}
exports.KubeClusterRoleBinding = KubeClusterRoleBinding;
/**
 * ClusterRoleBindingList is a collection of ClusterRoleBindings
 *
 * @schema io.k8s.api.rbac.v1.ClusterRoleBindingList
 */
class KubeClusterRoleBindingList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.ClusterRoleBindingList"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'ClusterRoleBindingList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.ClusterRoleBindingList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeClusterRoleBindingList.GVK,
            ...toJson_KubeClusterRoleBindingListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.ClusterRoleBindingList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeClusterRoleBindingList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeClusterRoleBindingList.GVK,
            ...toJson_KubeClusterRoleBindingListProps(resolved)
        };
    }
}
exports.KubeClusterRoleBindingList = KubeClusterRoleBindingList;
/**
 * ClusterRoleList is a collection of ClusterRoles
 *
 * @schema io.k8s.api.rbac.v1.ClusterRoleList
 */
class KubeClusterRoleList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.ClusterRoleList"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'ClusterRoleList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.ClusterRoleList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeClusterRoleList.GVK,
            ...toJson_KubeClusterRoleListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.ClusterRoleList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeClusterRoleList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeClusterRoleList.GVK,
            ...toJson_KubeClusterRoleListProps(resolved)
        };
    }
}
exports.KubeClusterRoleList = KubeClusterRoleList;
/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.
 *
 * @schema io.k8s.api.rbac.v1.Role
 */
class KubeRole extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.Role"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'Role'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.Role".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeRole.GVK,
            ...toJson_KubeRoleProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.Role" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeRole.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeRole.GVK,
            ...toJson_KubeRoleProps(resolved)
        };
    }
}
exports.KubeRole = KubeRole;
/**
 * RoleBinding references a role, but does not contain it.  It can reference a Role in the same namespace or a ClusterRole in the global namespace. It adds who information via Subjects and namespace information by which namespace it exists in.  RoleBindings in a given namespace only have effect in that namespace.
 *
 * @schema io.k8s.api.rbac.v1.RoleBinding
 */
class KubeRoleBinding extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.RoleBinding"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'RoleBinding'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.RoleBinding".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeRoleBinding.GVK,
            ...toJson_KubeRoleBindingProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.RoleBinding" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeRoleBinding.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeRoleBinding.GVK,
            ...toJson_KubeRoleBindingProps(resolved)
        };
    }
}
exports.KubeRoleBinding = KubeRoleBinding;
/**
 * RoleBindingList is a collection of RoleBindings
 *
 * @schema io.k8s.api.rbac.v1.RoleBindingList
 */
class KubeRoleBindingList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.RoleBindingList"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'RoleBindingList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.RoleBindingList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeRoleBindingList.GVK,
            ...toJson_KubeRoleBindingListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.RoleBindingList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeRoleBindingList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeRoleBindingList.GVK,
            ...toJson_KubeRoleBindingListProps(resolved)
        };
    }
}
exports.KubeRoleBindingList = KubeRoleBindingList;
/**
 * RoleList is a collection of Roles
 *
 * @schema io.k8s.api.rbac.v1.RoleList
 */
class KubeRoleList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.rbac.v1.RoleList"
     */
    static GVK = {
        apiVersion: 'rbac.authorization.k8s.io/v1',
        kind: 'RoleList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.rbac.v1.RoleList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeRoleList.GVK,
            ...toJson_KubeRoleListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.rbac.v1.RoleList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeRoleList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeRoleList.GVK,
            ...toJson_KubeRoleListProps(resolved)
        };
    }
}
exports.KubeRoleList = KubeRoleList;
/**
 * PriorityClass defines mapping from a priority class name to the priority integer value. The value can be any valid integer.
 *
 * @schema io.k8s.api.scheduling.v1.PriorityClass
 */
class KubePriorityClass extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.scheduling.v1.PriorityClass"
     */
    static GVK = {
        apiVersion: 'scheduling.k8s.io/v1',
        kind: 'PriorityClass'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.scheduling.v1.PriorityClass".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePriorityClass.GVK,
            ...toJson_KubePriorityClassProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.scheduling.v1.PriorityClass" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePriorityClass.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePriorityClass.GVK,
            ...toJson_KubePriorityClassProps(resolved)
        };
    }
}
exports.KubePriorityClass = KubePriorityClass;
/**
 * PriorityClassList is a collection of priority classes.
 *
 * @schema io.k8s.api.scheduling.v1.PriorityClassList
 */
class KubePriorityClassList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.scheduling.v1.PriorityClassList"
     */
    static GVK = {
        apiVersion: 'scheduling.k8s.io/v1',
        kind: 'PriorityClassList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.scheduling.v1.PriorityClassList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubePriorityClassList.GVK,
            ...toJson_KubePriorityClassListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.scheduling.v1.PriorityClassList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubePriorityClassList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubePriorityClassList.GVK,
            ...toJson_KubePriorityClassListProps(resolved)
        };
    }
}
exports.KubePriorityClassList = KubePriorityClassList;
/**
 * CSIDriver captures information about a Container Storage Interface (CSI) volume driver deployed on the cluster. Kubernetes attach detach controller uses this object to determine whether attach is required. Kubelet uses this object to determine whether pod information needs to be passed on mount. CSIDriver objects are non-namespaced.
 *
 * @schema io.k8s.api.storage.v1.CSIDriver
 */
class KubeCsiDriver extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.CSIDriver"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'CSIDriver'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.CSIDriver".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiDriver.GVK,
            ...toJson_KubeCsiDriverProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.CSIDriver" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiDriver.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiDriver.GVK,
            ...toJson_KubeCsiDriverProps(resolved)
        };
    }
}
exports.KubeCsiDriver = KubeCsiDriver;
/**
 * CSIDriverList is a collection of CSIDriver objects.
 *
 * @schema io.k8s.api.storage.v1.CSIDriverList
 */
class KubeCsiDriverList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.CSIDriverList"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'CSIDriverList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.CSIDriverList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiDriverList.GVK,
            ...toJson_KubeCsiDriverListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.CSIDriverList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiDriverList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiDriverList.GVK,
            ...toJson_KubeCsiDriverListProps(resolved)
        };
    }
}
exports.KubeCsiDriverList = KubeCsiDriverList;
/**
 * CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object.
 *
 * @schema io.k8s.api.storage.v1.CSINode
 */
class KubeCsiNode extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.CSINode"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'CSINode'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.CSINode".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiNode.GVK,
            ...toJson_KubeCsiNodeProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.CSINode" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiNode.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiNode.GVK,
            ...toJson_KubeCsiNodeProps(resolved)
        };
    }
}
exports.KubeCsiNode = KubeCsiNode;
/**
 * CSINodeList is a collection of CSINode objects.
 *
 * @schema io.k8s.api.storage.v1.CSINodeList
 */
class KubeCsiNodeList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.CSINodeList"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'CSINodeList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.CSINodeList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiNodeList.GVK,
            ...toJson_KubeCsiNodeListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.CSINodeList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiNodeList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiNodeList.GVK,
            ...toJson_KubeCsiNodeListProps(resolved)
        };
    }
}
exports.KubeCsiNodeList = KubeCsiNodeList;
/**
 * CSIStorageCapacity stores the result of one CSI GetCapacity call. For a given StorageClass, this describes the available capacity in a particular topology segment.  This can be used when considering where to instantiate new PersistentVolumes.

For example this can express things like: - StorageClass "standard" has "1234 GiB" available in "topology.kubernetes.io/zone=us-east1" - StorageClass "localssd" has "10 GiB" available in "kubernetes.io/hostname=knode-abc123"

The following three cases all imply that no capacity is available for a certain combination: - no object exists with suitable topology and storage class name - such an object exists, but the capacity is unset - such an object exists, but the capacity is zero

The producer of these objects can decide which approach is more suitable.

They are consumed by the kube-scheduler when a CSI driver opts into capacity-aware scheduling with CSIDriverSpec.StorageCapacity. The scheduler compares the MaximumVolumeSize against the requested size of pending volumes to filter out unsuitable nodes. If MaximumVolumeSize is unset, it falls back to a comparison against the less precise Capacity. If that is also unset, the scheduler assumes that capacity is insufficient and tries some other node.
 *
 * @schema io.k8s.api.storage.v1.CSIStorageCapacity
 */
class KubeCsiStorageCapacity extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.CSIStorageCapacity"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'CSIStorageCapacity'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.CSIStorageCapacity".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiStorageCapacity.GVK,
            ...toJson_KubeCsiStorageCapacityProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.CSIStorageCapacity" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiStorageCapacity.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiStorageCapacity.GVK,
            ...toJson_KubeCsiStorageCapacityProps(resolved)
        };
    }
}
exports.KubeCsiStorageCapacity = KubeCsiStorageCapacity;
/**
 * CSIStorageCapacityList is a collection of CSIStorageCapacity objects.
 *
 * @schema io.k8s.api.storage.v1.CSIStorageCapacityList
 */
class KubeCsiStorageCapacityList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.CSIStorageCapacityList"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'CSIStorageCapacityList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.CSIStorageCapacityList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiStorageCapacityList.GVK,
            ...toJson_KubeCsiStorageCapacityListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.CSIStorageCapacityList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiStorageCapacityList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiStorageCapacityList.GVK,
            ...toJson_KubeCsiStorageCapacityListProps(resolved)
        };
    }
}
exports.KubeCsiStorageCapacityList = KubeCsiStorageCapacityList;
/**
 * StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.

StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name.
 *
 * @schema io.k8s.api.storage.v1.StorageClass
 */
class KubeStorageClass extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.StorageClass"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'StorageClass'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.StorageClass".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeStorageClass.GVK,
            ...toJson_KubeStorageClassProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.StorageClass" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeStorageClass.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStorageClass.GVK,
            ...toJson_KubeStorageClassProps(resolved)
        };
    }
}
exports.KubeStorageClass = KubeStorageClass;
/**
 * StorageClassList is a collection of storage classes.
 *
 * @schema io.k8s.api.storage.v1.StorageClassList
 */
class KubeStorageClassList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.StorageClassList"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'StorageClassList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.StorageClassList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeStorageClassList.GVK,
            ...toJson_KubeStorageClassListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.StorageClassList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeStorageClassList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStorageClassList.GVK,
            ...toJson_KubeStorageClassListProps(resolved)
        };
    }
}
exports.KubeStorageClassList = KubeStorageClassList;
/**
 * VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node.

VolumeAttachment objects are non-namespaced.
 *
 * @schema io.k8s.api.storage.v1.VolumeAttachment
 */
class KubeVolumeAttachment extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.VolumeAttachment"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'VolumeAttachment'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.VolumeAttachment".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeVolumeAttachment.GVK,
            ...toJson_KubeVolumeAttachmentProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.VolumeAttachment" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeVolumeAttachment.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeVolumeAttachment.GVK,
            ...toJson_KubeVolumeAttachmentProps(resolved)
        };
    }
}
exports.KubeVolumeAttachment = KubeVolumeAttachment;
/**
 * VolumeAttachmentList is a collection of VolumeAttachment objects.
 *
 * @schema io.k8s.api.storage.v1.VolumeAttachmentList
 */
class KubeVolumeAttachmentList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1.VolumeAttachmentList"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1',
        kind: 'VolumeAttachmentList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1.VolumeAttachmentList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeVolumeAttachmentList.GVK,
            ...toJson_KubeVolumeAttachmentListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1.VolumeAttachmentList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeVolumeAttachmentList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeVolumeAttachmentList.GVK,
            ...toJson_KubeVolumeAttachmentListProps(resolved)
        };
    }
}
exports.KubeVolumeAttachmentList = KubeVolumeAttachmentList;
/**
 * CSIStorageCapacity stores the result of one CSI GetCapacity call. For a given StorageClass, this describes the available capacity in a particular topology segment.  This can be used when considering where to instantiate new PersistentVolumes.

For example this can express things like: - StorageClass "standard" has "1234 GiB" available in "topology.kubernetes.io/zone=us-east1" - StorageClass "localssd" has "10 GiB" available in "kubernetes.io/hostname=knode-abc123"

The following three cases all imply that no capacity is available for a certain combination: - no object exists with suitable topology and storage class name - such an object exists, but the capacity is unset - such an object exists, but the capacity is zero

The producer of these objects can decide which approach is more suitable.

They are consumed by the kube-scheduler when a CSI driver opts into capacity-aware scheduling with CSIDriverSpec.StorageCapacity. The scheduler compares the MaximumVolumeSize against the requested size of pending volumes to filter out unsuitable nodes. If MaximumVolumeSize is unset, it falls back to a comparison against the less precise Capacity. If that is also unset, the scheduler assumes that capacity is insufficient and tries some other node.
 *
 * @schema io.k8s.api.storage.v1beta1.CSIStorageCapacity
 */
class KubeCsiStorageCapacityV1Beta1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1beta1.CSIStorageCapacity"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1beta1',
        kind: 'CSIStorageCapacity'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1beta1.CSIStorageCapacity".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiStorageCapacityV1Beta1.GVK,
            ...toJson_KubeCsiStorageCapacityV1Beta1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1beta1.CSIStorageCapacity" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiStorageCapacityV1Beta1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiStorageCapacityV1Beta1.GVK,
            ...toJson_KubeCsiStorageCapacityV1Beta1Props(resolved)
        };
    }
}
exports.KubeCsiStorageCapacityV1Beta1 = KubeCsiStorageCapacityV1Beta1;
/**
 * CSIStorageCapacityList is a collection of CSIStorageCapacity objects.
 *
 * @schema io.k8s.api.storage.v1beta1.CSIStorageCapacityList
 */
class KubeCsiStorageCapacityListV1Beta1 extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.api.storage.v1beta1.CSIStorageCapacityList"
     */
    static GVK = {
        apiVersion: 'storage.k8s.io/v1beta1',
        kind: 'CSIStorageCapacityList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.api.storage.v1beta1.CSIStorageCapacityList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCsiStorageCapacityListV1Beta1.GVK,
            ...toJson_KubeCsiStorageCapacityListV1Beta1Props(props)
        };
    }
    /**
     * Defines a "io.k8s.api.storage.v1beta1.CSIStorageCapacityList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCsiStorageCapacityListV1Beta1.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCsiStorageCapacityListV1Beta1.GVK,
            ...toJson_KubeCsiStorageCapacityListV1Beta1Props(resolved)
        };
    }
}
exports.KubeCsiStorageCapacityListV1Beta1 = KubeCsiStorageCapacityListV1Beta1;
/**
 * CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>.
 *
 * @schema io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition
 */
class KubeCustomResourceDefinition extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition"
     */
    static GVK = {
        apiVersion: 'apiextensions.k8s.io/v1',
        kind: 'CustomResourceDefinition'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCustomResourceDefinition.GVK,
            ...toJson_KubeCustomResourceDefinitionProps(props)
        };
    }
    /**
     * Defines a "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinition" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCustomResourceDefinition.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCustomResourceDefinition.GVK,
            ...toJson_KubeCustomResourceDefinitionProps(resolved)
        };
    }
}
exports.KubeCustomResourceDefinition = KubeCustomResourceDefinition;
/**
 * CustomResourceDefinitionList is a list of CustomResourceDefinition objects.
 *
 * @schema io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionList
 */
class KubeCustomResourceDefinitionList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionList"
     */
    static GVK = {
        apiVersion: 'apiextensions.k8s.io/v1',
        kind: 'CustomResourceDefinitionList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeCustomResourceDefinitionList.GVK,
            ...toJson_KubeCustomResourceDefinitionListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.CustomResourceDefinitionList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeCustomResourceDefinitionList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeCustomResourceDefinitionList.GVK,
            ...toJson_KubeCustomResourceDefinitionListProps(resolved)
        };
    }
}
exports.KubeCustomResourceDefinitionList = KubeCustomResourceDefinitionList;
/**
 * Status is a return value for calls that don't return other objects.
 *
 * @schema io.k8s.apimachinery.pkg.apis.meta.v1.Status
 */
class KubeStatus extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.apimachinery.pkg.apis.meta.v1.Status"
     */
    static GVK = {
        apiVersion: 'v1',
        kind: 'Status'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.apimachinery.pkg.apis.meta.v1.Status".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeStatus.GVK,
            ...toJson_KubeStatusProps(props)
        };
    }
    /**
     * Defines a "io.k8s.apimachinery.pkg.apis.meta.v1.Status" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeStatus.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeStatus.GVK,
            ...toJson_KubeStatusProps(resolved)
        };
    }
}
exports.KubeStatus = KubeStatus;
/**
 * APIService represents a server for a particular GroupVersion. Name must be "version.group".
 *
 * @schema io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIService
 */
class KubeApiService extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIService"
     */
    static GVK = {
        apiVersion: 'apiregistration.k8s.io/v1',
        kind: 'APIService'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIService".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props = {}) {
        return {
            ...KubeApiService.GVK,
            ...toJson_KubeApiServiceProps(props)
        };
    }
    /**
     * Defines a "io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIService" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props = {}) {
        super(scope, id, {
            ...KubeApiService.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeApiService.GVK,
            ...toJson_KubeApiServiceProps(resolved)
        };
    }
}
exports.KubeApiService = KubeApiService;
/**
 * APIServiceList is a list of APIService objects.
 *
 * @schema io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIServiceList
 */
class KubeApiServiceList extends cdk8s_1.ApiObject {
    /**
     * Returns the apiVersion and kind for "io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIServiceList"
     */
    static GVK = {
        apiVersion: 'apiregistration.k8s.io/v1',
        kind: 'APIServiceList'
    };
    /**
     * Renders a Kubernetes manifest for "io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIServiceList".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...KubeApiServiceList.GVK,
            ...toJson_KubeApiServiceListProps(props)
        };
    }
    /**
     * Defines a "io.k8s.kube-aggregator.pkg.apis.apiregistration.v1.APIServiceList" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...KubeApiServiceList.GVK,
            ...props
        });
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...KubeApiServiceList.GVK,
            ...toJson_KubeApiServiceListProps(resolved)
        };
    }
}
exports.KubeApiServiceList = KubeApiServiceList;
/**
 * Converts an object of type 'KubeMutatingWebhookConfigurationProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeMutatingWebhookConfigurationProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        webhooks: obj.webhooks?.map(y => toJson_MutatingWebhook(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeMutatingWebhookConfigurationProps = toJson_KubeMutatingWebhookConfigurationProps;
/**
 * Converts an object of type 'KubeMutatingWebhookConfigurationListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeMutatingWebhookConfigurationListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeMutatingWebhookConfigurationProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeMutatingWebhookConfigurationListProps = toJson_KubeMutatingWebhookConfigurationListProps;
/**
 * Converts an object of type 'KubeValidatingWebhookConfigurationProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeValidatingWebhookConfigurationProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        webhooks: obj.webhooks?.map(y => toJson_ValidatingWebhook(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeValidatingWebhookConfigurationProps = toJson_KubeValidatingWebhookConfigurationProps;
/**
 * Converts an object of type 'KubeValidatingWebhookConfigurationListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeValidatingWebhookConfigurationListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeValidatingWebhookConfigurationProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeValidatingWebhookConfigurationListProps = toJson_KubeValidatingWebhookConfigurationListProps;
/**
 * Converts an object of type 'KubeStorageVersionV1Alpha1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStorageVersionV1Alpha1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: obj.spec
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStorageVersionV1Alpha1Props = toJson_KubeStorageVersionV1Alpha1Props;
/**
 * Converts an object of type 'KubeStorageVersionListV1Alpha1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStorageVersionListV1Alpha1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeStorageVersionV1Alpha1Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStorageVersionListV1Alpha1Props = toJson_KubeStorageVersionListV1Alpha1Props;
/**
 * Converts an object of type 'KubeControllerRevisionProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeControllerRevisionProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        data: obj.data,
        revision: obj.revision
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeControllerRevisionProps = toJson_KubeControllerRevisionProps;
/**
 * Converts an object of type 'KubeControllerRevisionListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeControllerRevisionListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeControllerRevisionProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeControllerRevisionListProps = toJson_KubeControllerRevisionListProps;
/**
 * Converts an object of type 'KubeDaemonSetProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeDaemonSetProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_DaemonSetSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeDaemonSetProps = toJson_KubeDaemonSetProps;
/**
 * Converts an object of type 'KubeDaemonSetListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeDaemonSetListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeDaemonSetProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeDaemonSetListProps = toJson_KubeDaemonSetListProps;
/**
 * Converts an object of type 'KubeDeploymentProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeDeploymentProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_DeploymentSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeDeploymentProps = toJson_KubeDeploymentProps;
/**
 * Converts an object of type 'KubeDeploymentListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeDeploymentListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeDeploymentProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeDeploymentListProps = toJson_KubeDeploymentListProps;
/**
 * Converts an object of type 'KubeReplicaSetProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeReplicaSetProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ReplicaSetSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeReplicaSetProps = toJson_KubeReplicaSetProps;
/**
 * Converts an object of type 'KubeReplicaSetListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeReplicaSetListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeReplicaSetProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeReplicaSetListProps = toJson_KubeReplicaSetListProps;
/**
 * Converts an object of type 'KubeStatefulSetProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStatefulSetProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_StatefulSetSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStatefulSetProps = toJson_KubeStatefulSetProps;
/**
 * Converts an object of type 'KubeStatefulSetListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStatefulSetListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeStatefulSetProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStatefulSetListProps = toJson_KubeStatefulSetListProps;
/**
 * Converts an object of type 'KubeTokenRequestProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeTokenRequestProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_TokenRequestSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeTokenRequestProps = toJson_KubeTokenRequestProps;
/**
 * Converts an object of type 'KubeTokenReviewProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeTokenReviewProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_TokenReviewSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeTokenReviewProps = toJson_KubeTokenReviewProps;
/**
 * Converts an object of type 'KubeLocalSubjectAccessReviewProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeLocalSubjectAccessReviewProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_SubjectAccessReviewSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeLocalSubjectAccessReviewProps = toJson_KubeLocalSubjectAccessReviewProps;
/**
 * Converts an object of type 'KubeSelfSubjectAccessReviewProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeSelfSubjectAccessReviewProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_SelfSubjectAccessReviewSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeSelfSubjectAccessReviewProps = toJson_KubeSelfSubjectAccessReviewProps;
/**
 * Converts an object of type 'KubeSelfSubjectRulesReviewProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeSelfSubjectRulesReviewProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_SelfSubjectRulesReviewSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeSelfSubjectRulesReviewProps = toJson_KubeSelfSubjectRulesReviewProps;
/**
 * Converts an object of type 'KubeSubjectAccessReviewProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeSubjectAccessReviewProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_SubjectAccessReviewSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeSubjectAccessReviewProps = toJson_KubeSubjectAccessReviewProps;
/**
 * Converts an object of type 'KubeHorizontalPodAutoscalerProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeHorizontalPodAutoscalerProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_HorizontalPodAutoscalerSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeHorizontalPodAutoscalerProps = toJson_KubeHorizontalPodAutoscalerProps;
/**
 * Converts an object of type 'KubeHorizontalPodAutoscalerListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeHorizontalPodAutoscalerListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeHorizontalPodAutoscalerProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeHorizontalPodAutoscalerListProps = toJson_KubeHorizontalPodAutoscalerListProps;
/**
 * Converts an object of type 'KubeScaleProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeScaleProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ScaleSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeScaleProps = toJson_KubeScaleProps;
/**
 * Converts an object of type 'KubeHorizontalPodAutoscalerV2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeHorizontalPodAutoscalerV2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_HorizontalPodAutoscalerSpecV2(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeHorizontalPodAutoscalerV2Props = toJson_KubeHorizontalPodAutoscalerV2Props;
/**
 * Converts an object of type 'KubeHorizontalPodAutoscalerListV2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeHorizontalPodAutoscalerListV2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeHorizontalPodAutoscalerV2Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeHorizontalPodAutoscalerListV2Props = toJson_KubeHorizontalPodAutoscalerListV2Props;
/**
 * Converts an object of type 'KubeHorizontalPodAutoscalerV2Beta2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeHorizontalPodAutoscalerV2Beta2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_HorizontalPodAutoscalerSpecV2Beta2(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeHorizontalPodAutoscalerV2Beta2Props = toJson_KubeHorizontalPodAutoscalerV2Beta2Props;
/**
 * Converts an object of type 'KubeHorizontalPodAutoscalerListV2Beta2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeHorizontalPodAutoscalerListV2Beta2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeHorizontalPodAutoscalerV2Beta2Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeHorizontalPodAutoscalerListV2Beta2Props = toJson_KubeHorizontalPodAutoscalerListV2Beta2Props;
/**
 * Converts an object of type 'KubeCronJobProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCronJobProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_CronJobSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCronJobProps = toJson_KubeCronJobProps;
/**
 * Converts an object of type 'KubeCronJobListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCronJobListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCronJobProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCronJobListProps = toJson_KubeCronJobListProps;
/**
 * Converts an object of type 'KubeJobProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeJobProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_JobSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeJobProps = toJson_KubeJobProps;
/**
 * Converts an object of type 'KubeJobListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeJobListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeJobProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeJobListProps = toJson_KubeJobListProps;
/**
 * Converts an object of type 'KubeCertificateSigningRequestProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCertificateSigningRequestProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_CertificateSigningRequestSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCertificateSigningRequestProps = toJson_KubeCertificateSigningRequestProps;
/**
 * Converts an object of type 'KubeCertificateSigningRequestListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCertificateSigningRequestListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCertificateSigningRequestProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCertificateSigningRequestListProps = toJson_KubeCertificateSigningRequestListProps;
/**
 * Converts an object of type 'KubeLeaseProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeLeaseProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_LeaseSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeLeaseProps = toJson_KubeLeaseProps;
/**
 * Converts an object of type 'KubeLeaseListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeLeaseListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeLeaseProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeLeaseListProps = toJson_KubeLeaseListProps;
/**
 * Converts an object of type 'KubeBindingProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeBindingProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        target: toJson_ObjectReference(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeBindingProps = toJson_KubeBindingProps;
/**
 * Converts an object of type 'KubeComponentStatusProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeComponentStatusProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        conditions: obj.conditions?.map(y => toJson_ComponentCondition(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeComponentStatusProps = toJson_KubeComponentStatusProps;
/**
 * Converts an object of type 'KubeComponentStatusListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeComponentStatusListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeComponentStatusProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeComponentStatusListProps = toJson_KubeComponentStatusListProps;
/**
 * Converts an object of type 'KubeConfigMapProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeConfigMapProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        binaryData: obj.binaryData === undefined ? undefined : Object.entries(obj.binaryData).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        data: obj.data === undefined ? undefined : Object.entries(obj.data).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        immutable: obj.immutable
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeConfigMapProps = toJson_KubeConfigMapProps;
/**
 * Converts an object of type 'KubeConfigMapListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeConfigMapListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeConfigMapProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeConfigMapListProps = toJson_KubeConfigMapListProps;
/**
 * Converts an object of type 'KubeEndpointsProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEndpointsProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        subsets: obj.subsets?.map(y => toJson_EndpointSubset(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEndpointsProps = toJson_KubeEndpointsProps;
/**
 * Converts an object of type 'KubeEndpointsListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEndpointsListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeEndpointsProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEndpointsListProps = toJson_KubeEndpointsListProps;
/**
 * Converts an object of type 'KubeEventProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEventProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        action: obj.action,
        deprecatedCount: obj.deprecatedCount,
        deprecatedFirstTimestamp: obj.deprecatedFirstTimestamp?.toISOString(),
        deprecatedLastTimestamp: obj.deprecatedLastTimestamp?.toISOString(),
        deprecatedSource: toJson_EventSource(obj.deprecatedSource),
        eventTime: obj.eventTime?.toISOString(),
        note: obj.note,
        reason: obj.reason,
        regarding: toJson_ObjectReference(obj.regarding),
        related: toJson_ObjectReference(obj.related),
        reportingController: obj.reportingController,
        reportingInstance: obj.reportingInstance,
        series: toJson_EventSeries(obj.series),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEventProps = toJson_KubeEventProps;
/**
 * Converts an object of type 'KubeEventListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEventListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeEventProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEventListProps = toJson_KubeEventListProps;
/**
 * Converts an object of type 'KubeLimitRangeProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeLimitRangeProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_LimitRangeSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeLimitRangeProps = toJson_KubeLimitRangeProps;
/**
 * Converts an object of type 'KubeLimitRangeListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeLimitRangeListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeLimitRangeProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeLimitRangeListProps = toJson_KubeLimitRangeListProps;
/**
 * Converts an object of type 'KubeNamespaceProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeNamespaceProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_NamespaceSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeNamespaceProps = toJson_KubeNamespaceProps;
/**
 * Converts an object of type 'KubeNamespaceListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeNamespaceListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeNamespaceProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeNamespaceListProps = toJson_KubeNamespaceListProps;
/**
 * Converts an object of type 'KubeNodeProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeNodeProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_NodeSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeNodeProps = toJson_KubeNodeProps;
/**
 * Converts an object of type 'KubeNodeListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeNodeListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeNodeProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeNodeListProps = toJson_KubeNodeListProps;
/**
 * Converts an object of type 'KubePersistentVolumeProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePersistentVolumeProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PersistentVolumeSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePersistentVolumeProps = toJson_KubePersistentVolumeProps;
/**
 * Converts an object of type 'KubePersistentVolumeClaimProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePersistentVolumeClaimProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PersistentVolumeClaimSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePersistentVolumeClaimProps = toJson_KubePersistentVolumeClaimProps;
/**
 * Converts an object of type 'KubePersistentVolumeClaimListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePersistentVolumeClaimListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePersistentVolumeClaimProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePersistentVolumeClaimListProps = toJson_KubePersistentVolumeClaimListProps;
/**
 * Converts an object of type 'KubePersistentVolumeListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePersistentVolumeListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePersistentVolumeProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePersistentVolumeListProps = toJson_KubePersistentVolumeListProps;
/**
 * Converts an object of type 'KubePodProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePodProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PodSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePodProps = toJson_KubePodProps;
/**
 * Converts an object of type 'KubePodListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePodListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePodProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePodListProps = toJson_KubePodListProps;
/**
 * Converts an object of type 'KubePodTemplateProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePodTemplateProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        template: toJson_PodTemplateSpec(obj.template)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePodTemplateProps = toJson_KubePodTemplateProps;
/**
 * Converts an object of type 'KubePodTemplateListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePodTemplateListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePodTemplateProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePodTemplateListProps = toJson_KubePodTemplateListProps;
/**
 * Converts an object of type 'KubeReplicationControllerProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeReplicationControllerProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ReplicationControllerSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeReplicationControllerProps = toJson_KubeReplicationControllerProps;
/**
 * Converts an object of type 'KubeReplicationControllerListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeReplicationControllerListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeReplicationControllerProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeReplicationControllerListProps = toJson_KubeReplicationControllerListProps;
/**
 * Converts an object of type 'KubeResourceQuotaProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeResourceQuotaProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ResourceQuotaSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeResourceQuotaProps = toJson_KubeResourceQuotaProps;
/**
 * Converts an object of type 'KubeResourceQuotaListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeResourceQuotaListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeResourceQuotaProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeResourceQuotaListProps = toJson_KubeResourceQuotaListProps;
/**
 * Converts an object of type 'KubeSecretProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeSecretProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        data: obj.data === undefined ? undefined : Object.entries(obj.data).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        immutable: obj.immutable,
        stringData: obj.stringData === undefined ? undefined : Object.entries(obj.stringData).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeSecretProps = toJson_KubeSecretProps;
/**
 * Converts an object of type 'KubeSecretListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeSecretListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeSecretProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeSecretListProps = toJson_KubeSecretListProps;
/**
 * Converts an object of type 'KubeServiceProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeServiceProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ServiceSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeServiceProps = toJson_KubeServiceProps;
/**
 * Converts an object of type 'KubeServiceAccountProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeServiceAccountProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        automountServiceAccountToken: obj.automountServiceAccountToken,
        imagePullSecrets: obj.imagePullSecrets?.map(y => toJson_LocalObjectReference(y)),
        secrets: obj.secrets?.map(y => toJson_ObjectReference(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeServiceAccountProps = toJson_KubeServiceAccountProps;
/**
 * Converts an object of type 'KubeServiceAccountListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeServiceAccountListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeServiceAccountProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeServiceAccountListProps = toJson_KubeServiceAccountListProps;
/**
 * Converts an object of type 'KubeServiceListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeServiceListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeServiceProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeServiceListProps = toJson_KubeServiceListProps;
/**
 * Converts an object of type 'KubeEndpointSliceProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEndpointSliceProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        addressType: obj.addressType,
        endpoints: obj.endpoints?.map(y => toJson_Endpoint(y)),
        ports: obj.ports?.map(y => toJson_EndpointPort(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEndpointSliceProps = toJson_KubeEndpointSliceProps;
/**
 * Converts an object of type 'KubeEndpointSliceListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEndpointSliceListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeEndpointSliceProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEndpointSliceListProps = toJson_KubeEndpointSliceListProps;
/**
 * Converts an object of type 'KubeFlowSchemaV1Beta1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeFlowSchemaV1Beta1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_FlowSchemaSpecV1Beta1(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeFlowSchemaV1Beta1Props = toJson_KubeFlowSchemaV1Beta1Props;
/**
 * Converts an object of type 'KubeFlowSchemaListV1Beta1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeFlowSchemaListV1Beta1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeFlowSchemaV1Beta1Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeFlowSchemaListV1Beta1Props = toJson_KubeFlowSchemaListV1Beta1Props;
/**
 * Converts an object of type 'KubePriorityLevelConfigurationV1Beta1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePriorityLevelConfigurationV1Beta1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PriorityLevelConfigurationSpecV1Beta1(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePriorityLevelConfigurationV1Beta1Props = toJson_KubePriorityLevelConfigurationV1Beta1Props;
/**
 * Converts an object of type 'KubePriorityLevelConfigurationListV1Beta1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePriorityLevelConfigurationListV1Beta1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePriorityLevelConfigurationV1Beta1Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePriorityLevelConfigurationListV1Beta1Props = toJson_KubePriorityLevelConfigurationListV1Beta1Props;
/**
 * Converts an object of type 'KubeFlowSchemaV1Beta2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeFlowSchemaV1Beta2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_FlowSchemaSpecV1Beta2(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeFlowSchemaV1Beta2Props = toJson_KubeFlowSchemaV1Beta2Props;
/**
 * Converts an object of type 'KubeFlowSchemaListV1Beta2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeFlowSchemaListV1Beta2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeFlowSchemaV1Beta2Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeFlowSchemaListV1Beta2Props = toJson_KubeFlowSchemaListV1Beta2Props;
/**
 * Converts an object of type 'KubePriorityLevelConfigurationV1Beta2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePriorityLevelConfigurationV1Beta2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PriorityLevelConfigurationSpecV1Beta2(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePriorityLevelConfigurationV1Beta2Props = toJson_KubePriorityLevelConfigurationV1Beta2Props;
/**
 * Converts an object of type 'KubePriorityLevelConfigurationListV1Beta2Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePriorityLevelConfigurationListV1Beta2Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePriorityLevelConfigurationV1Beta2Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePriorityLevelConfigurationListV1Beta2Props = toJson_KubePriorityLevelConfigurationListV1Beta2Props;
/**
 * Converts an object of type 'KubeIngressProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeIngressProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_IngressSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeIngressProps = toJson_KubeIngressProps;
/**
 * Converts an object of type 'KubeIngressClassProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeIngressClassProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_IngressClassSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeIngressClassProps = toJson_KubeIngressClassProps;
/**
 * Converts an object of type 'KubeIngressClassListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeIngressClassListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeIngressClassProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeIngressClassListProps = toJson_KubeIngressClassListProps;
/**
 * Converts an object of type 'KubeIngressListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeIngressListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeIngressProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeIngressListProps = toJson_KubeIngressListProps;
/**
 * Converts an object of type 'KubeNetworkPolicyProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeNetworkPolicyProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_NetworkPolicySpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeNetworkPolicyProps = toJson_KubeNetworkPolicyProps;
/**
 * Converts an object of type 'KubeNetworkPolicyListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeNetworkPolicyListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeNetworkPolicyProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeNetworkPolicyListProps = toJson_KubeNetworkPolicyListProps;
/**
 * Converts an object of type 'KubeClusterCidrv1Alpha1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeClusterCidrv1Alpha1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ClusterCidrSpecV1Alpha1(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeClusterCidrv1Alpha1Props = toJson_KubeClusterCidrv1Alpha1Props;
/**
 * Converts an object of type 'KubeClusterCidrListV1Alpha1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeClusterCidrListV1Alpha1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeClusterCidrv1Alpha1Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeClusterCidrListV1Alpha1Props = toJson_KubeClusterCidrListV1Alpha1Props;
/**
 * Converts an object of type 'KubeRuntimeClassProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeRuntimeClassProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        handler: obj.handler,
        overhead: toJson_Overhead(obj.overhead),
        scheduling: toJson_Scheduling(obj.scheduling)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeRuntimeClassProps = toJson_KubeRuntimeClassProps;
/**
 * Converts an object of type 'KubeRuntimeClassListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeRuntimeClassListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeRuntimeClassProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeRuntimeClassListProps = toJson_KubeRuntimeClassListProps;
/**
 * Converts an object of type 'KubeEvictionProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeEvictionProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        deleteOptions: toJson_DeleteOptions(obj.deleteOptions)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeEvictionProps = toJson_KubeEvictionProps;
/**
 * Converts an object of type 'KubePodDisruptionBudgetProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePodDisruptionBudgetProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PodDisruptionBudgetSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePodDisruptionBudgetProps = toJson_KubePodDisruptionBudgetProps;
/**
 * Converts an object of type 'KubePodDisruptionBudgetListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePodDisruptionBudgetListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePodDisruptionBudgetProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePodDisruptionBudgetListProps = toJson_KubePodDisruptionBudgetListProps;
/**
 * Converts an object of type 'KubeClusterRoleProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeClusterRoleProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        aggregationRule: toJson_AggregationRule(obj.aggregationRule),
        rules: obj.rules?.map(y => toJson_PolicyRule(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeClusterRoleProps = toJson_KubeClusterRoleProps;
/**
 * Converts an object of type 'KubeClusterRoleBindingProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeClusterRoleBindingProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        roleRef: toJson_RoleRef(obj.roleRef),
        subjects: obj.subjects?.map(y => toJson_Subject(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeClusterRoleBindingProps = toJson_KubeClusterRoleBindingProps;
/**
 * Converts an object of type 'KubeClusterRoleBindingListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeClusterRoleBindingListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeClusterRoleBindingProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeClusterRoleBindingListProps = toJson_KubeClusterRoleBindingListProps;
/**
 * Converts an object of type 'KubeClusterRoleListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeClusterRoleListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeClusterRoleProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeClusterRoleListProps = toJson_KubeClusterRoleListProps;
/**
 * Converts an object of type 'KubeRoleProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeRoleProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        rules: obj.rules?.map(y => toJson_PolicyRule(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeRoleProps = toJson_KubeRoleProps;
/**
 * Converts an object of type 'KubeRoleBindingProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeRoleBindingProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        roleRef: toJson_RoleRef(obj.roleRef),
        subjects: obj.subjects?.map(y => toJson_Subject(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeRoleBindingProps = toJson_KubeRoleBindingProps;
/**
 * Converts an object of type 'KubeRoleBindingListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeRoleBindingListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeRoleBindingProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeRoleBindingListProps = toJson_KubeRoleBindingListProps;
/**
 * Converts an object of type 'KubeRoleListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeRoleListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeRoleProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeRoleListProps = toJson_KubeRoleListProps;
/**
 * Converts an object of type 'KubePriorityClassProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePriorityClassProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        description: obj.description,
        globalDefault: obj.globalDefault,
        preemptionPolicy: obj.preemptionPolicy,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePriorityClassProps = toJson_KubePriorityClassProps;
/**
 * Converts an object of type 'KubePriorityClassListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubePriorityClassListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubePriorityClassProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubePriorityClassListProps = toJson_KubePriorityClassListProps;
/**
 * Converts an object of type 'KubeCsiDriverProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiDriverProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_CsiDriverSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiDriverProps = toJson_KubeCsiDriverProps;
/**
 * Converts an object of type 'KubeCsiDriverListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiDriverListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCsiDriverProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiDriverListProps = toJson_KubeCsiDriverListProps;
/**
 * Converts an object of type 'KubeCsiNodeProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiNodeProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_CsiNodeSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiNodeProps = toJson_KubeCsiNodeProps;
/**
 * Converts an object of type 'KubeCsiNodeListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiNodeListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCsiNodeProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiNodeListProps = toJson_KubeCsiNodeListProps;
/**
 * Converts an object of type 'KubeCsiStorageCapacityProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiStorageCapacityProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        capacity: obj.capacity?.value,
        maximumVolumeSize: obj.maximumVolumeSize?.value,
        nodeTopology: toJson_LabelSelector(obj.nodeTopology),
        storageClassName: obj.storageClassName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiStorageCapacityProps = toJson_KubeCsiStorageCapacityProps;
/**
 * Converts an object of type 'KubeCsiStorageCapacityListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiStorageCapacityListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCsiStorageCapacityProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiStorageCapacityListProps = toJson_KubeCsiStorageCapacityListProps;
/**
 * Converts an object of type 'KubeStorageClassProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStorageClassProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        allowVolumeExpansion: obj.allowVolumeExpansion,
        allowedTopologies: obj.allowedTopologies?.map(y => toJson_TopologySelectorTerm(y)),
        mountOptions: obj.mountOptions?.map(y => y),
        parameters: obj.parameters === undefined ? undefined : Object.entries(obj.parameters).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        provisioner: obj.provisioner,
        reclaimPolicy: obj.reclaimPolicy,
        volumeBindingMode: obj.volumeBindingMode
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStorageClassProps = toJson_KubeStorageClassProps;
/**
 * Converts an object of type 'KubeStorageClassListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStorageClassListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeStorageClassProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStorageClassListProps = toJson_KubeStorageClassListProps;
/**
 * Converts an object of type 'KubeVolumeAttachmentProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeVolumeAttachmentProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_VolumeAttachmentSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeVolumeAttachmentProps = toJson_KubeVolumeAttachmentProps;
/**
 * Converts an object of type 'KubeVolumeAttachmentListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeVolumeAttachmentListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeVolumeAttachmentProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeVolumeAttachmentListProps = toJson_KubeVolumeAttachmentListProps;
/**
 * Converts an object of type 'KubeCsiStorageCapacityV1Beta1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiStorageCapacityV1Beta1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        capacity: obj.capacity?.value,
        maximumVolumeSize: obj.maximumVolumeSize?.value,
        nodeTopology: toJson_LabelSelector(obj.nodeTopology),
        storageClassName: obj.storageClassName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiStorageCapacityV1Beta1Props = toJson_KubeCsiStorageCapacityV1Beta1Props;
/**
 * Converts an object of type 'KubeCsiStorageCapacityListV1Beta1Props' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCsiStorageCapacityListV1Beta1Props(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCsiStorageCapacityV1Beta1Props(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCsiStorageCapacityListV1Beta1Props = toJson_KubeCsiStorageCapacityListV1Beta1Props;
/**
 * Converts an object of type 'KubeCustomResourceDefinitionProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCustomResourceDefinitionProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_CustomResourceDefinitionSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCustomResourceDefinitionProps = toJson_KubeCustomResourceDefinitionProps;
/**
 * Converts an object of type 'KubeCustomResourceDefinitionListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeCustomResourceDefinitionListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeCustomResourceDefinitionProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeCustomResourceDefinitionListProps = toJson_KubeCustomResourceDefinitionListProps;
/**
 * Converts an object of type 'KubeStatusProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeStatusProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        code: obj.code,
        details: toJson_StatusDetails(obj.details),
        message: obj.message,
        reason: obj.reason
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeStatusProps = toJson_KubeStatusProps;
/**
 * Converts an object of type 'KubeApiServiceProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeApiServiceProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_ApiServiceSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeApiServiceProps = toJson_KubeApiServiceProps;
/**
 * Converts an object of type 'KubeApiServiceListProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KubeApiServiceListProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ListMeta(obj.metadata),
        items: obj.items?.map(y => toJson_KubeApiServiceProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KubeApiServiceListProps = toJson_KubeApiServiceListProps;
/**
 * Converts an object of type 'ObjectMeta' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ObjectMeta(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        annotations: obj.annotations === undefined ? undefined : Object.entries(obj.annotations).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        creationTimestamp: obj.creationTimestamp?.toISOString(),
        deletionGracePeriodSeconds: obj.deletionGracePeriodSeconds,
        deletionTimestamp: obj.deletionTimestamp?.toISOString(),
        finalizers: obj.finalizers?.map(y => y),
        generateName: obj.generateName,
        generation: obj.generation,
        labels: obj.labels === undefined ? undefined : Object.entries(obj.labels).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        managedFields: obj.managedFields?.map(y => toJson_ManagedFieldsEntry(y)),
        name: obj.name,
        namespace: obj.namespace,
        ownerReferences: obj.ownerReferences?.map(y => toJson_OwnerReference(y)),
        resourceVersion: obj.resourceVersion,
        selfLink: obj.selfLink,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ObjectMeta = toJson_ObjectMeta;
/**
 * Converts an object of type 'MutatingWebhook' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MutatingWebhook(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        admissionReviewVersions: obj.admissionReviewVersions?.map(y => y),
        clientConfig: toJson_WebhookClientConfig(obj.clientConfig),
        failurePolicy: obj.failurePolicy,
        matchPolicy: obj.matchPolicy,
        name: obj.name,
        namespaceSelector: toJson_LabelSelector(obj.namespaceSelector),
        objectSelector: toJson_LabelSelector(obj.objectSelector),
        reinvocationPolicy: obj.reinvocationPolicy,
        rules: obj.rules?.map(y => toJson_RuleWithOperations(y)),
        sideEffects: obj.sideEffects,
        timeoutSeconds: obj.timeoutSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MutatingWebhook = toJson_MutatingWebhook;
/**
 * Converts an object of type 'ListMeta' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ListMeta(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        continue: obj.continue,
        remainingItemCount: obj.remainingItemCount,
        resourceVersion: obj.resourceVersion,
        selfLink: obj.selfLink
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ListMeta = toJson_ListMeta;
/**
 * Converts an object of type 'ValidatingWebhook' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ValidatingWebhook(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        admissionReviewVersions: obj.admissionReviewVersions?.map(y => y),
        clientConfig: toJson_WebhookClientConfig(obj.clientConfig),
        failurePolicy: obj.failurePolicy,
        matchPolicy: obj.matchPolicy,
        name: obj.name,
        namespaceSelector: toJson_LabelSelector(obj.namespaceSelector),
        objectSelector: toJson_LabelSelector(obj.objectSelector),
        rules: obj.rules?.map(y => toJson_RuleWithOperations(y)),
        sideEffects: obj.sideEffects,
        timeoutSeconds: obj.timeoutSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ValidatingWebhook = toJson_ValidatingWebhook;
/**
 * Converts an object of type 'DaemonSetSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DaemonSetSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        minReadySeconds: obj.minReadySeconds,
        revisionHistoryLimit: obj.revisionHistoryLimit,
        selector: toJson_LabelSelector(obj.selector),
        template: toJson_PodTemplateSpec(obj.template),
        updateStrategy: toJson_DaemonSetUpdateStrategy(obj.updateStrategy)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DaemonSetSpec = toJson_DaemonSetSpec;
/**
 * Converts an object of type 'DeploymentSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DeploymentSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        minReadySeconds: obj.minReadySeconds,
        paused: obj.paused,
        progressDeadlineSeconds: obj.progressDeadlineSeconds,
        replicas: obj.replicas,
        revisionHistoryLimit: obj.revisionHistoryLimit,
        selector: toJson_LabelSelector(obj.selector),
        strategy: toJson_DeploymentStrategy(obj.strategy),
        template: toJson_PodTemplateSpec(obj.template)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DeploymentSpec = toJson_DeploymentSpec;
/**
 * Converts an object of type 'ReplicaSetSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ReplicaSetSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        minReadySeconds: obj.minReadySeconds,
        replicas: obj.replicas,
        selector: toJson_LabelSelector(obj.selector),
        template: toJson_PodTemplateSpec(obj.template)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ReplicaSetSpec = toJson_ReplicaSetSpec;
/**
 * Converts an object of type 'StatefulSetSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StatefulSetSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        minReadySeconds: obj.minReadySeconds,
        persistentVolumeClaimRetentionPolicy: toJson_StatefulSetPersistentVolumeClaimRetentionPolicy(obj.persistentVolumeClaimRetentionPolicy),
        podManagementPolicy: obj.podManagementPolicy,
        replicas: obj.replicas,
        revisionHistoryLimit: obj.revisionHistoryLimit,
        selector: toJson_LabelSelector(obj.selector),
        serviceName: obj.serviceName,
        template: toJson_PodTemplateSpec(obj.template),
        updateStrategy: toJson_StatefulSetUpdateStrategy(obj.updateStrategy),
        volumeClaimTemplates: obj.volumeClaimTemplates?.map(y => toJson_KubePersistentVolumeClaimProps(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StatefulSetSpec = toJson_StatefulSetSpec;
/**
 * Converts an object of type 'TokenRequestSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TokenRequestSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        audiences: obj.audiences?.map(y => y),
        boundObjectRef: toJson_BoundObjectReference(obj.boundObjectRef),
        expirationSeconds: obj.expirationSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TokenRequestSpec = toJson_TokenRequestSpec;
/**
 * Converts an object of type 'TokenReviewSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TokenReviewSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        audiences: obj.audiences?.map(y => y),
        token: obj.token
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TokenReviewSpec = toJson_TokenReviewSpec;
/**
 * Converts an object of type 'SubjectAccessReviewSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SubjectAccessReviewSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        extra: obj.extra === undefined ? undefined : Object.entries(obj.extra).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.map(y => y) }), {}),
        groups: obj.groups?.map(y => y),
        nonResourceAttributes: toJson_NonResourceAttributes(obj.nonResourceAttributes),
        resourceAttributes: toJson_ResourceAttributes(obj.resourceAttributes),
        uid: obj.uid,
        user: obj.user
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SubjectAccessReviewSpec = toJson_SubjectAccessReviewSpec;
/**
 * Converts an object of type 'SelfSubjectAccessReviewSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SelfSubjectAccessReviewSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nonResourceAttributes: toJson_NonResourceAttributes(obj.nonResourceAttributes),
        resourceAttributes: toJson_ResourceAttributes(obj.resourceAttributes)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SelfSubjectAccessReviewSpec = toJson_SelfSubjectAccessReviewSpec;
/**
 * Converts an object of type 'SelfSubjectRulesReviewSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SelfSubjectRulesReviewSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        namespace: obj.namespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SelfSubjectRulesReviewSpec = toJson_SelfSubjectRulesReviewSpec;
/**
 * Converts an object of type 'HorizontalPodAutoscalerSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HorizontalPodAutoscalerSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        maxReplicas: obj.maxReplicas,
        minReplicas: obj.minReplicas,
        scaleTargetRef: toJson_CrossVersionObjectReference(obj.scaleTargetRef),
        targetCPUUtilizationPercentage: obj.targetCpuUtilizationPercentage
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HorizontalPodAutoscalerSpec = toJson_HorizontalPodAutoscalerSpec;
/**
 * Converts an object of type 'ScaleSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ScaleSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        replicas: obj.replicas
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ScaleSpec = toJson_ScaleSpec;
/**
 * Converts an object of type 'HorizontalPodAutoscalerSpecV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HorizontalPodAutoscalerSpecV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        behavior: toJson_HorizontalPodAutoscalerBehaviorV2(obj.behavior),
        maxReplicas: obj.maxReplicas,
        metrics: obj.metrics?.map(y => toJson_MetricSpecV2(y)),
        minReplicas: obj.minReplicas,
        scaleTargetRef: toJson_CrossVersionObjectReferenceV2(obj.scaleTargetRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HorizontalPodAutoscalerSpecV2 = toJson_HorizontalPodAutoscalerSpecV2;
/**
 * Converts an object of type 'HorizontalPodAutoscalerSpecV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HorizontalPodAutoscalerSpecV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        behavior: toJson_HorizontalPodAutoscalerBehaviorV2Beta2(obj.behavior),
        maxReplicas: obj.maxReplicas,
        metrics: obj.metrics?.map(y => toJson_MetricSpecV2Beta2(y)),
        minReplicas: obj.minReplicas,
        scaleTargetRef: toJson_CrossVersionObjectReferenceV2Beta2(obj.scaleTargetRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HorizontalPodAutoscalerSpecV2Beta2 = toJson_HorizontalPodAutoscalerSpecV2Beta2;
/**
 * Converts an object of type 'CronJobSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CronJobSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        concurrencyPolicy: obj.concurrencyPolicy,
        failedJobsHistoryLimit: obj.failedJobsHistoryLimit,
        jobTemplate: toJson_JobTemplateSpec(obj.jobTemplate),
        schedule: obj.schedule,
        startingDeadlineSeconds: obj.startingDeadlineSeconds,
        successfulJobsHistoryLimit: obj.successfulJobsHistoryLimit,
        suspend: obj.suspend,
        timeZone: obj.timeZone
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CronJobSpec = toJson_CronJobSpec;
/**
 * Converts an object of type 'JobSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_JobSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        activeDeadlineSeconds: obj.activeDeadlineSeconds,
        backoffLimit: obj.backoffLimit,
        completionMode: obj.completionMode,
        completions: obj.completions,
        manualSelector: obj.manualSelector,
        parallelism: obj.parallelism,
        podFailurePolicy: toJson_PodFailurePolicy(obj.podFailurePolicy),
        selector: toJson_LabelSelector(obj.selector),
        suspend: obj.suspend,
        template: toJson_PodTemplateSpec(obj.template),
        ttlSecondsAfterFinished: obj.ttlSecondsAfterFinished
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_JobSpec = toJson_JobSpec;
/**
 * Converts an object of type 'CertificateSigningRequestSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CertificateSigningRequestSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        expirationSeconds: obj.expirationSeconds,
        extra: obj.extra === undefined ? undefined : Object.entries(obj.extra).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.map(y => y) }), {}),
        groups: obj.groups?.map(y => y),
        request: obj.request,
        signerName: obj.signerName,
        uid: obj.uid,
        usages: obj.usages?.map(y => y),
        username: obj.username
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CertificateSigningRequestSpec = toJson_CertificateSigningRequestSpec;
/**
 * Converts an object of type 'LeaseSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LeaseSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        acquireTime: obj.acquireTime?.toISOString(),
        holderIdentity: obj.holderIdentity,
        leaseDurationSeconds: obj.leaseDurationSeconds,
        leaseTransitions: obj.leaseTransitions,
        renewTime: obj.renewTime?.toISOString()
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LeaseSpec = toJson_LeaseSpec;
/**
 * Converts an object of type 'ObjectReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ObjectReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        fieldPath: obj.fieldPath,
        kind: obj.kind,
        name: obj.name,
        namespace: obj.namespace,
        resourceVersion: obj.resourceVersion,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ObjectReference = toJson_ObjectReference;
/**
 * Converts an object of type 'ComponentCondition' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ComponentCondition(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        error: obj.error,
        message: obj.message,
        status: obj.status,
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ComponentCondition = toJson_ComponentCondition;
/**
 * Converts an object of type 'EndpointSubset' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EndpointSubset(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        addresses: obj.addresses?.map(y => toJson_EndpointAddress(y)),
        notReadyAddresses: obj.notReadyAddresses?.map(y => toJson_EndpointAddress(y)),
        ports: obj.ports?.map(y => toJson_EndpointPort(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EndpointSubset = toJson_EndpointSubset;
/**
 * Converts an object of type 'EventSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EventSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        component: obj.component,
        host: obj.host
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EventSource = toJson_EventSource;
/**
 * Converts an object of type 'EventSeries' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EventSeries(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        count: obj.count,
        lastObservedTime: obj.lastObservedTime?.toISOString()
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EventSeries = toJson_EventSeries;
/**
 * Converts an object of type 'LimitRangeSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LimitRangeSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        limits: obj.limits?.map(y => toJson_LimitRangeItem(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LimitRangeSpec = toJson_LimitRangeSpec;
/**
 * Converts an object of type 'NamespaceSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NamespaceSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        finalizers: obj.finalizers?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NamespaceSpec = toJson_NamespaceSpec;
/**
 * Converts an object of type 'NodeSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NodeSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        configSource: toJson_NodeConfigSource(obj.configSource),
        externalID: obj.externalId,
        podCIDR: obj.podCidr,
        podCIDRs: obj.podCidRs?.map(y => y),
        providerID: obj.providerId,
        taints: obj.taints?.map(y => toJson_Taint(y)),
        unschedulable: obj.unschedulable
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NodeSpec = toJson_NodeSpec;
/**
 * Converts an object of type 'PersistentVolumeSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PersistentVolumeSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        accessModes: obj.accessModes?.map(y => y),
        awsElasticBlockStore: toJson_AwsElasticBlockStoreVolumeSource(obj.awsElasticBlockStore),
        azureDisk: toJson_AzureDiskVolumeSource(obj.azureDisk),
        azureFile: toJson_AzureFilePersistentVolumeSource(obj.azureFile),
        capacity: obj.capacity === undefined ? undefined : Object.entries(obj.capacity).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        cephfs: toJson_CephFsPersistentVolumeSource(obj.cephfs),
        cinder: toJson_CinderPersistentVolumeSource(obj.cinder),
        claimRef: toJson_ObjectReference(obj.claimRef),
        csi: toJson_CsiPersistentVolumeSource(obj.csi),
        fc: toJson_FcVolumeSource(obj.fc),
        flexVolume: toJson_FlexPersistentVolumeSource(obj.flexVolume),
        flocker: toJson_FlockerVolumeSource(obj.flocker),
        gcePersistentDisk: toJson_GcePersistentDiskVolumeSource(obj.gcePersistentDisk),
        glusterfs: toJson_GlusterfsPersistentVolumeSource(obj.glusterfs),
        hostPath: toJson_HostPathVolumeSource(obj.hostPath),
        iscsi: toJson_IscsiPersistentVolumeSource(obj.iscsi),
        local: toJson_LocalVolumeSource(obj.local),
        mountOptions: obj.mountOptions?.map(y => y),
        nfs: toJson_NfsVolumeSource(obj.nfs),
        nodeAffinity: toJson_VolumeNodeAffinity(obj.nodeAffinity),
        persistentVolumeReclaimPolicy: obj.persistentVolumeReclaimPolicy,
        photonPersistentDisk: toJson_PhotonPersistentDiskVolumeSource(obj.photonPersistentDisk),
        portworxVolume: toJson_PortworxVolumeSource(obj.portworxVolume),
        quobyte: toJson_QuobyteVolumeSource(obj.quobyte),
        rbd: toJson_RbdPersistentVolumeSource(obj.rbd),
        scaleIO: toJson_ScaleIoPersistentVolumeSource(obj.scaleIo),
        storageClassName: obj.storageClassName,
        storageos: toJson_StorageOsPersistentVolumeSource(obj.storageos),
        volumeMode: obj.volumeMode,
        vsphereVolume: toJson_VsphereVirtualDiskVolumeSource(obj.vsphereVolume)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PersistentVolumeSpec = toJson_PersistentVolumeSpec;
/**
 * Converts an object of type 'PersistentVolumeClaimSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PersistentVolumeClaimSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        accessModes: obj.accessModes?.map(y => y),
        dataSource: toJson_TypedLocalObjectReference(obj.dataSource),
        dataSourceRef: toJson_TypedLocalObjectReference(obj.dataSourceRef),
        resources: toJson_ResourceRequirements(obj.resources),
        selector: toJson_LabelSelector(obj.selector),
        storageClassName: obj.storageClassName,
        volumeMode: obj.volumeMode,
        volumeName: obj.volumeName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PersistentVolumeClaimSpec = toJson_PersistentVolumeClaimSpec;
/**
 * Converts an object of type 'PodSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        activeDeadlineSeconds: obj.activeDeadlineSeconds,
        affinity: toJson_Affinity(obj.affinity),
        automountServiceAccountToken: obj.automountServiceAccountToken,
        containers: obj.containers?.map(y => toJson_Container(y)),
        dnsConfig: toJson_PodDnsConfig(obj.dnsConfig),
        dnsPolicy: obj.dnsPolicy,
        enableServiceLinks: obj.enableServiceLinks,
        ephemeralContainers: obj.ephemeralContainers?.map(y => toJson_EphemeralContainer(y)),
        hostAliases: obj.hostAliases?.map(y => toJson_HostAlias(y)),
        hostIPC: obj.hostIpc,
        hostNetwork: obj.hostNetwork,
        hostPID: obj.hostPid,
        hostUsers: obj.hostUsers,
        hostname: obj.hostname,
        imagePullSecrets: obj.imagePullSecrets?.map(y => toJson_LocalObjectReference(y)),
        initContainers: obj.initContainers?.map(y => toJson_Container(y)),
        nodeName: obj.nodeName,
        nodeSelector: obj.nodeSelector === undefined ? undefined : Object.entries(obj.nodeSelector).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        os: toJson_PodOs(obj.os),
        overhead: obj.overhead === undefined ? undefined : Object.entries(obj.overhead).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        preemptionPolicy: obj.preemptionPolicy,
        priority: obj.priority,
        priorityClassName: obj.priorityClassName,
        readinessGates: obj.readinessGates?.map(y => toJson_PodReadinessGate(y)),
        restartPolicy: obj.restartPolicy,
        runtimeClassName: obj.runtimeClassName,
        schedulerName: obj.schedulerName,
        securityContext: toJson_PodSecurityContext(obj.securityContext),
        serviceAccount: obj.serviceAccount,
        serviceAccountName: obj.serviceAccountName,
        setHostnameAsFQDN: obj.setHostnameAsFqdn,
        shareProcessNamespace: obj.shareProcessNamespace,
        subdomain: obj.subdomain,
        terminationGracePeriodSeconds: obj.terminationGracePeriodSeconds,
        tolerations: obj.tolerations?.map(y => toJson_Toleration(y)),
        topologySpreadConstraints: obj.topologySpreadConstraints?.map(y => toJson_TopologySpreadConstraint(y)),
        volumes: obj.volumes?.map(y => toJson_Volume(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodSpec = toJson_PodSpec;
/**
 * Converts an object of type 'PodTemplateSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodTemplateSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PodSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodTemplateSpec = toJson_PodTemplateSpec;
/**
 * Converts an object of type 'ReplicationControllerSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ReplicationControllerSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        minReadySeconds: obj.minReadySeconds,
        replicas: obj.replicas,
        selector: obj.selector === undefined ? undefined : Object.entries(obj.selector).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        template: toJson_PodTemplateSpec(obj.template)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ReplicationControllerSpec = toJson_ReplicationControllerSpec;
/**
 * Converts an object of type 'ResourceQuotaSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourceQuotaSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        hard: obj.hard === undefined ? undefined : Object.entries(obj.hard).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        scopeSelector: toJson_ScopeSelector(obj.scopeSelector),
        scopes: obj.scopes?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourceQuotaSpec = toJson_ResourceQuotaSpec;
/**
 * Converts an object of type 'ServiceSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServiceSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        allocateLoadBalancerNodePorts: obj.allocateLoadBalancerNodePorts,
        clusterIP: obj.clusterIp,
        clusterIPs: obj.clusterIPs?.map(y => y),
        externalIPs: obj.externalIPs?.map(y => y),
        externalName: obj.externalName,
        externalTrafficPolicy: obj.externalTrafficPolicy,
        healthCheckNodePort: obj.healthCheckNodePort,
        internalTrafficPolicy: obj.internalTrafficPolicy,
        ipFamilies: obj.ipFamilies?.map(y => y),
        ipFamilyPolicy: obj.ipFamilyPolicy,
        loadBalancerClass: obj.loadBalancerClass,
        loadBalancerIP: obj.loadBalancerIp,
        loadBalancerSourceRanges: obj.loadBalancerSourceRanges?.map(y => y),
        ports: obj.ports?.map(y => toJson_ServicePort(y)),
        publishNotReadyAddresses: obj.publishNotReadyAddresses,
        selector: obj.selector === undefined ? undefined : Object.entries(obj.selector).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        sessionAffinity: obj.sessionAffinity,
        sessionAffinityConfig: toJson_SessionAffinityConfig(obj.sessionAffinityConfig),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServiceSpec = toJson_ServiceSpec;
/**
 * Converts an object of type 'LocalObjectReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LocalObjectReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LocalObjectReference = toJson_LocalObjectReference;
/**
 * Converts an object of type 'Endpoint' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Endpoint(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        addresses: obj.addresses?.map(y => y),
        conditions: toJson_EndpointConditions(obj.conditions),
        deprecatedTopology: obj.deprecatedTopology === undefined ? undefined : Object.entries(obj.deprecatedTopology).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        hints: toJson_EndpointHints(obj.hints),
        hostname: obj.hostname,
        nodeName: obj.nodeName,
        targetRef: toJson_ObjectReference(obj.targetRef),
        zone: obj.zone
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Endpoint = toJson_Endpoint;
/**
 * Converts an object of type 'EndpointPort' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EndpointPort(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        appProtocol: obj.appProtocol,
        name: obj.name,
        port: obj.port,
        protocol: obj.protocol
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EndpointPort = toJson_EndpointPort;
/**
 * Converts an object of type 'FlowSchemaSpecV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlowSchemaSpecV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        distinguisherMethod: toJson_FlowDistinguisherMethodV1Beta1(obj.distinguisherMethod),
        matchingPrecedence: obj.matchingPrecedence,
        priorityLevelConfiguration: toJson_PriorityLevelConfigurationReferenceV1Beta1(obj.priorityLevelConfiguration),
        rules: obj.rules?.map(y => toJson_PolicyRulesWithSubjectsV1Beta1(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlowSchemaSpecV1Beta1 = toJson_FlowSchemaSpecV1Beta1;
/**
 * Converts an object of type 'PriorityLevelConfigurationSpecV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PriorityLevelConfigurationSpecV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        limited: toJson_LimitedPriorityLevelConfigurationV1Beta1(obj.limited),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PriorityLevelConfigurationSpecV1Beta1 = toJson_PriorityLevelConfigurationSpecV1Beta1;
/**
 * Converts an object of type 'FlowSchemaSpecV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlowSchemaSpecV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        distinguisherMethod: toJson_FlowDistinguisherMethodV1Beta2(obj.distinguisherMethod),
        matchingPrecedence: obj.matchingPrecedence,
        priorityLevelConfiguration: toJson_PriorityLevelConfigurationReferenceV1Beta2(obj.priorityLevelConfiguration),
        rules: obj.rules?.map(y => toJson_PolicyRulesWithSubjectsV1Beta2(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlowSchemaSpecV1Beta2 = toJson_FlowSchemaSpecV1Beta2;
/**
 * Converts an object of type 'PriorityLevelConfigurationSpecV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PriorityLevelConfigurationSpecV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        limited: toJson_LimitedPriorityLevelConfigurationV1Beta2(obj.limited),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PriorityLevelConfigurationSpecV1Beta2 = toJson_PriorityLevelConfigurationSpecV1Beta2;
/**
 * Converts an object of type 'IngressSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        defaultBackend: toJson_IngressBackend(obj.defaultBackend),
        ingressClassName: obj.ingressClassName,
        rules: obj.rules?.map(y => toJson_IngressRule(y)),
        tls: obj.tls?.map(y => toJson_IngressTls(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressSpec = toJson_IngressSpec;
/**
 * Converts an object of type 'IngressClassSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressClassSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        controller: obj.controller,
        parameters: toJson_IngressClassParametersReference(obj.parameters)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressClassSpec = toJson_IngressClassSpec;
/**
 * Converts an object of type 'NetworkPolicySpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NetworkPolicySpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        egress: obj.egress?.map(y => toJson_NetworkPolicyEgressRule(y)),
        ingress: obj.ingress?.map(y => toJson_NetworkPolicyIngressRule(y)),
        podSelector: toJson_LabelSelector(obj.podSelector),
        policyTypes: obj.policyTypes?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NetworkPolicySpec = toJson_NetworkPolicySpec;
/**
 * Converts an object of type 'ClusterCidrSpecV1Alpha1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ClusterCidrSpecV1Alpha1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        ipv4: obj.ipv4,
        ipv6: obj.ipv6,
        nodeSelector: toJson_NodeSelector(obj.nodeSelector),
        perNodeHostBits: obj.perNodeHostBits
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ClusterCidrSpecV1Alpha1 = toJson_ClusterCidrSpecV1Alpha1;
/**
 * Converts an object of type 'Overhead' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Overhead(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        podFixed: obj.podFixed === undefined ? undefined : Object.entries(obj.podFixed).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {})
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Overhead = toJson_Overhead;
/**
 * Converts an object of type 'Scheduling' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Scheduling(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nodeSelector: obj.nodeSelector === undefined ? undefined : Object.entries(obj.nodeSelector).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        tolerations: obj.tolerations?.map(y => toJson_Toleration(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Scheduling = toJson_Scheduling;
/**
 * Converts an object of type 'DeleteOptions' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DeleteOptions(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        dryRun: obj.dryRun?.map(y => y),
        gracePeriodSeconds: obj.gracePeriodSeconds,
        kind: obj.kind,
        orphanDependents: obj.orphanDependents,
        preconditions: toJson_Preconditions(obj.preconditions),
        propagationPolicy: obj.propagationPolicy
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DeleteOptions = toJson_DeleteOptions;
/**
 * Converts an object of type 'PodDisruptionBudgetSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodDisruptionBudgetSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        maxUnavailable: obj.maxUnavailable?.value,
        minAvailable: obj.minAvailable?.value,
        selector: toJson_LabelSelector(obj.selector)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodDisruptionBudgetSpec = toJson_PodDisruptionBudgetSpec;
/**
 * Converts an object of type 'AggregationRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_AggregationRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        clusterRoleSelectors: obj.clusterRoleSelectors?.map(y => toJson_LabelSelector(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_AggregationRule = toJson_AggregationRule;
/**
 * Converts an object of type 'PolicyRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PolicyRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroups: obj.apiGroups?.map(y => y),
        nonResourceURLs: obj.nonResourceUrLs?.map(y => y),
        resourceNames: obj.resourceNames?.map(y => y),
        resources: obj.resources?.map(y => y),
        verbs: obj.verbs?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PolicyRule = toJson_PolicyRule;
/**
 * Converts an object of type 'RoleRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RoleRef(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroup: obj.apiGroup,
        kind: obj.kind,
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RoleRef = toJson_RoleRef;
/**
 * Converts an object of type 'Subject' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Subject(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroup: obj.apiGroup,
        kind: obj.kind,
        name: obj.name,
        namespace: obj.namespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Subject = toJson_Subject;
/**
 * Converts an object of type 'CsiDriverSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CsiDriverSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        attachRequired: obj.attachRequired,
        fsGroupPolicy: obj.fsGroupPolicy,
        podInfoOnMount: obj.podInfoOnMount,
        requiresRepublish: obj.requiresRepublish,
        seLinuxMount: obj.seLinuxMount,
        storageCapacity: obj.storageCapacity,
        tokenRequests: obj.tokenRequests?.map(y => toJson_TokenRequest(y)),
        volumeLifecycleModes: obj.volumeLifecycleModes?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CsiDriverSpec = toJson_CsiDriverSpec;
/**
 * Converts an object of type 'CsiNodeSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CsiNodeSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        drivers: obj.drivers?.map(y => toJson_CsiNodeDriver(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CsiNodeSpec = toJson_CsiNodeSpec;
/* eslint-enable max-len, quote-props */
/**
 * @schema io.k8s.apimachinery.pkg.api.resource.Quantity
 */
class Quantity {
    value;
    static fromString(value) {
        return new Quantity(value);
    }
    static fromNumber(value) {
        return new Quantity(value);
    }
    constructor(value) {
        this.value = value;
    }
}
exports.Quantity = Quantity;
/**
 * Converts an object of type 'LabelSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LabelSelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        matchExpressions: obj.matchExpressions?.map(y => toJson_LabelSelectorRequirement(y)),
        matchLabels: obj.matchLabels === undefined ? undefined : Object.entries(obj.matchLabels).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {})
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LabelSelector = toJson_LabelSelector;
/**
 * Converts an object of type 'TopologySelectorTerm' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TopologySelectorTerm(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        matchLabelExpressions: obj.matchLabelExpressions?.map(y => toJson_TopologySelectorLabelRequirement(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TopologySelectorTerm = toJson_TopologySelectorTerm;
/**
 * Converts an object of type 'VolumeAttachmentSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeAttachmentSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        attacher: obj.attacher,
        nodeName: obj.nodeName,
        source: toJson_VolumeAttachmentSource(obj.source)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeAttachmentSpec = toJson_VolumeAttachmentSpec;
/**
 * Converts an object of type 'CustomResourceDefinitionSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceDefinitionSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        conversion: toJson_CustomResourceConversion(obj.conversion),
        group: obj.group,
        names: toJson_CustomResourceDefinitionNames(obj.names),
        preserveUnknownFields: obj.preserveUnknownFields,
        scope: obj.scope,
        versions: obj.versions?.map(y => toJson_CustomResourceDefinitionVersion(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceDefinitionSpec = toJson_CustomResourceDefinitionSpec;
/**
 * Converts an object of type 'StatusDetails' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StatusDetails(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        causes: obj.causes?.map(y => toJson_StatusCause(y)),
        group: obj.group,
        kind: obj.kind,
        name: obj.name,
        retryAfterSeconds: obj.retryAfterSeconds,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StatusDetails = toJson_StatusDetails;
/**
 * Converts an object of type 'ApiServiceSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ApiServiceSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        caBundle: obj.caBundle,
        group: obj.group,
        groupPriorityMinimum: obj.groupPriorityMinimum,
        insecureSkipTLSVerify: obj.insecureSkipTlsVerify,
        service: toJson_ServiceReference(obj.service),
        version: obj.version,
        versionPriority: obj.versionPriority
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ApiServiceSpec = toJson_ApiServiceSpec;
/**
 * Converts an object of type 'ManagedFieldsEntry' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ManagedFieldsEntry(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        fieldsType: obj.fieldsType,
        fieldsV1: obj.fieldsV1,
        manager: obj.manager,
        operation: obj.operation,
        subresource: obj.subresource,
        time: obj.time?.toISOString()
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ManagedFieldsEntry = toJson_ManagedFieldsEntry;
/**
 * Converts an object of type 'OwnerReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_OwnerReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        blockOwnerDeletion: obj.blockOwnerDeletion,
        controller: obj.controller,
        kind: obj.kind,
        name: obj.name,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_OwnerReference = toJson_OwnerReference;
/**
 * Converts an object of type 'WebhookClientConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_WebhookClientConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        caBundle: obj.caBundle,
        service: toJson_ServiceReference(obj.service),
        url: obj.url
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_WebhookClientConfig = toJson_WebhookClientConfig;
/**
 * Converts an object of type 'RuleWithOperations' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RuleWithOperations(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroups: obj.apiGroups?.map(y => y),
        apiVersions: obj.apiVersions?.map(y => y),
        operations: obj.operations?.map(y => y),
        resources: obj.resources?.map(y => y),
        scope: obj.scope
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RuleWithOperations = toJson_RuleWithOperations;
/**
 * Converts an object of type 'DaemonSetUpdateStrategy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DaemonSetUpdateStrategy(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        rollingUpdate: toJson_RollingUpdateDaemonSet(obj.rollingUpdate),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DaemonSetUpdateStrategy = toJson_DaemonSetUpdateStrategy;
/**
 * Converts an object of type 'DeploymentStrategy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DeploymentStrategy(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        rollingUpdate: toJson_RollingUpdateDeployment(obj.rollingUpdate),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DeploymentStrategy = toJson_DeploymentStrategy;
/**
 * Converts an object of type 'StatefulSetPersistentVolumeClaimRetentionPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StatefulSetPersistentVolumeClaimRetentionPolicy(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        whenDeleted: obj.whenDeleted,
        whenScaled: obj.whenScaled
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StatefulSetPersistentVolumeClaimRetentionPolicy = toJson_StatefulSetPersistentVolumeClaimRetentionPolicy;
/**
 * Converts an object of type 'StatefulSetUpdateStrategy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StatefulSetUpdateStrategy(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        rollingUpdate: toJson_RollingUpdateStatefulSetStrategy(obj.rollingUpdate),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StatefulSetUpdateStrategy = toJson_StatefulSetUpdateStrategy;
/**
 * Converts an object of type 'BoundObjectReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_BoundObjectReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        kind: obj.kind,
        name: obj.name,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_BoundObjectReference = toJson_BoundObjectReference;
/**
 * Converts an object of type 'NonResourceAttributes' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NonResourceAttributes(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        path: obj.path,
        verb: obj.verb
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NonResourceAttributes = toJson_NonResourceAttributes;
/**
 * Converts an object of type 'ResourceAttributes' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourceAttributes(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        group: obj.group,
        name: obj.name,
        namespace: obj.namespace,
        resource: obj.resource,
        subresource: obj.subresource,
        verb: obj.verb,
        version: obj.version
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourceAttributes = toJson_ResourceAttributes;
/**
 * Converts an object of type 'CrossVersionObjectReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CrossVersionObjectReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        kind: obj.kind,
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CrossVersionObjectReference = toJson_CrossVersionObjectReference;
/**
 * Converts an object of type 'HorizontalPodAutoscalerBehaviorV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HorizontalPodAutoscalerBehaviorV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        scaleDown: toJson_HpaScalingRulesV2(obj.scaleDown),
        scaleUp: toJson_HpaScalingRulesV2(obj.scaleUp)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HorizontalPodAutoscalerBehaviorV2 = toJson_HorizontalPodAutoscalerBehaviorV2;
/**
 * Converts an object of type 'MetricSpecV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MetricSpecV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        containerResource: toJson_ContainerResourceMetricSourceV2(obj.containerResource),
        external: toJson_ExternalMetricSourceV2(obj.external),
        object: toJson_ObjectMetricSourceV2(obj.object),
        pods: toJson_PodsMetricSourceV2(obj.pods),
        resource: toJson_ResourceMetricSourceV2(obj.resource),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MetricSpecV2 = toJson_MetricSpecV2;
/**
 * Converts an object of type 'CrossVersionObjectReferenceV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CrossVersionObjectReferenceV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        kind: obj.kind,
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CrossVersionObjectReferenceV2 = toJson_CrossVersionObjectReferenceV2;
/**
 * Converts an object of type 'HorizontalPodAutoscalerBehaviorV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HorizontalPodAutoscalerBehaviorV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        scaleDown: toJson_HpaScalingRulesV2Beta2(obj.scaleDown),
        scaleUp: toJson_HpaScalingRulesV2Beta2(obj.scaleUp)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HorizontalPodAutoscalerBehaviorV2Beta2 = toJson_HorizontalPodAutoscalerBehaviorV2Beta2;
/**
 * Converts an object of type 'MetricSpecV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MetricSpecV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        containerResource: toJson_ContainerResourceMetricSourceV2Beta2(obj.containerResource),
        external: toJson_ExternalMetricSourceV2Beta2(obj.external),
        object: toJson_ObjectMetricSourceV2Beta2(obj.object),
        pods: toJson_PodsMetricSourceV2Beta2(obj.pods),
        resource: toJson_ResourceMetricSourceV2Beta2(obj.resource),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MetricSpecV2Beta2 = toJson_MetricSpecV2Beta2;
/**
 * Converts an object of type 'CrossVersionObjectReferenceV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CrossVersionObjectReferenceV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        kind: obj.kind,
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CrossVersionObjectReferenceV2Beta2 = toJson_CrossVersionObjectReferenceV2Beta2;
/**
 * Converts an object of type 'JobTemplateSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_JobTemplateSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_JobSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_JobTemplateSpec = toJson_JobTemplateSpec;
/**
 * Converts an object of type 'PodFailurePolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodFailurePolicy(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        rules: obj.rules?.map(y => toJson_PodFailurePolicyRule(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodFailurePolicy = toJson_PodFailurePolicy;
/**
 * Converts an object of type 'EndpointAddress' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EndpointAddress(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        hostname: obj.hostname,
        ip: obj.ip,
        nodeName: obj.nodeName,
        targetRef: toJson_ObjectReference(obj.targetRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EndpointAddress = toJson_EndpointAddress;
/**
 * Converts an object of type 'LimitRangeItem' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LimitRangeItem(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        default: obj.default === undefined ? undefined : Object.entries(obj.default).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        defaultRequest: obj.defaultRequest === undefined ? undefined : Object.entries(obj.defaultRequest).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        max: obj.max === undefined ? undefined : Object.entries(obj.max).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        maxLimitRequestRatio: obj.maxLimitRequestRatio === undefined
            ? undefined
            : Object.entries(obj.maxLimitRequestRatio).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        min: obj.min === undefined ? undefined : Object.entries(obj.min).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LimitRangeItem = toJson_LimitRangeItem;
/**
 * Converts an object of type 'NodeConfigSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NodeConfigSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        configMap: toJson_ConfigMapNodeConfigSource(obj.configMap)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NodeConfigSource = toJson_NodeConfigSource;
/**
 * Converts an object of type 'Taint' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Taint(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        effect: obj.effect,
        key: obj.key,
        timeAdded: obj.timeAdded?.toISOString(),
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Taint = toJson_Taint;
/**
 * Converts an object of type 'AwsElasticBlockStoreVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_AwsElasticBlockStoreVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        partition: obj.partition,
        readOnly: obj.readOnly,
        volumeID: obj.volumeId
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_AwsElasticBlockStoreVolumeSource = toJson_AwsElasticBlockStoreVolumeSource;
/**
 * Converts an object of type 'AzureDiskVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_AzureDiskVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        cachingMode: obj.cachingMode,
        diskName: obj.diskName,
        diskURI: obj.diskUri,
        fsType: obj.fsType,
        kind: obj.kind,
        readOnly: obj.readOnly
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_AzureDiskVolumeSource = toJson_AzureDiskVolumeSource;
/**
 * Converts an object of type 'AzureFilePersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_AzureFilePersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        readOnly: obj.readOnly,
        secretName: obj.secretName,
        secretNamespace: obj.secretNamespace,
        shareName: obj.shareName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_AzureFilePersistentVolumeSource = toJson_AzureFilePersistentVolumeSource;
/**
 * Converts an object of type 'CephFsPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CephFsPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        monitors: obj.monitors?.map(y => y),
        path: obj.path,
        readOnly: obj.readOnly,
        secretFile: obj.secretFile,
        secretRef: toJson_SecretReference(obj.secretRef),
        user: obj.user
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CephFsPersistentVolumeSource = toJson_CephFsPersistentVolumeSource;
/**
 * Converts an object of type 'CinderPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CinderPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        readOnly: obj.readOnly,
        secretRef: toJson_SecretReference(obj.secretRef),
        volumeID: obj.volumeId
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CinderPersistentVolumeSource = toJson_CinderPersistentVolumeSource;
/**
 * Converts an object of type 'CsiPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CsiPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        controllerExpandSecretRef: toJson_SecretReference(obj.controllerExpandSecretRef),
        controllerPublishSecretRef: toJson_SecretReference(obj.controllerPublishSecretRef),
        driver: obj.driver,
        fsType: obj.fsType,
        nodeExpandSecretRef: toJson_SecretReference(obj.nodeExpandSecretRef),
        nodePublishSecretRef: toJson_SecretReference(obj.nodePublishSecretRef),
        nodeStageSecretRef: toJson_SecretReference(obj.nodeStageSecretRef),
        readOnly: obj.readOnly,
        volumeAttributes: obj.volumeAttributes === undefined ? undefined : Object.entries(obj.volumeAttributes).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        volumeHandle: obj.volumeHandle
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CsiPersistentVolumeSource = toJson_CsiPersistentVolumeSource;
/**
 * Converts an object of type 'FcVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FcVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        lun: obj.lun,
        readOnly: obj.readOnly,
        targetWWNs: obj.targetWwNs?.map(y => y),
        wwids: obj.wwids?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FcVolumeSource = toJson_FcVolumeSource;
/**
 * Converts an object of type 'FlexPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlexPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        driver: obj.driver,
        fsType: obj.fsType,
        options: obj.options === undefined ? undefined : Object.entries(obj.options).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        readOnly: obj.readOnly,
        secretRef: toJson_SecretReference(obj.secretRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlexPersistentVolumeSource = toJson_FlexPersistentVolumeSource;
/**
 * Converts an object of type 'FlockerVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlockerVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        datasetName: obj.datasetName,
        datasetUUID: obj.datasetUuid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlockerVolumeSource = toJson_FlockerVolumeSource;
/**
 * Converts an object of type 'GcePersistentDiskVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GcePersistentDiskVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        partition: obj.partition,
        pdName: obj.pdName,
        readOnly: obj.readOnly
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GcePersistentDiskVolumeSource = toJson_GcePersistentDiskVolumeSource;
/**
 * Converts an object of type 'GlusterfsPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GlusterfsPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        endpoints: obj.endpoints,
        endpointsNamespace: obj.endpointsNamespace,
        path: obj.path,
        readOnly: obj.readOnly
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GlusterfsPersistentVolumeSource = toJson_GlusterfsPersistentVolumeSource;
/**
 * Converts an object of type 'HostPathVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HostPathVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        path: obj.path,
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HostPathVolumeSource = toJson_HostPathVolumeSource;
/**
 * Converts an object of type 'IscsiPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IscsiPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        chapAuthDiscovery: obj.chapAuthDiscovery,
        chapAuthSession: obj.chapAuthSession,
        fsType: obj.fsType,
        initiatorName: obj.initiatorName,
        iqn: obj.iqn,
        iscsiInterface: obj.iscsiInterface,
        lun: obj.lun,
        portals: obj.portals?.map(y => y),
        readOnly: obj.readOnly,
        secretRef: toJson_SecretReference(obj.secretRef),
        targetPortal: obj.targetPortal
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IscsiPersistentVolumeSource = toJson_IscsiPersistentVolumeSource;
/**
 * Converts an object of type 'LocalVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LocalVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        path: obj.path
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LocalVolumeSource = toJson_LocalVolumeSource;
/**
 * Converts an object of type 'NfsVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NfsVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        path: obj.path,
        readOnly: obj.readOnly,
        server: obj.server
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NfsVolumeSource = toJson_NfsVolumeSource;
/**
 * Converts an object of type 'VolumeNodeAffinity' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeNodeAffinity(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        required: toJson_NodeSelector(obj.required)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeNodeAffinity = toJson_VolumeNodeAffinity;
/**
 * Converts an object of type 'PhotonPersistentDiskVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PhotonPersistentDiskVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        pdID: obj.pdId
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PhotonPersistentDiskVolumeSource = toJson_PhotonPersistentDiskVolumeSource;
/**
 * Converts an object of type 'PortworxVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PortworxVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        readOnly: obj.readOnly,
        volumeID: obj.volumeId
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PortworxVolumeSource = toJson_PortworxVolumeSource;
/**
 * Converts an object of type 'QuobyteVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_QuobyteVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        group: obj.group,
        readOnly: obj.readOnly,
        registry: obj.registry,
        tenant: obj.tenant,
        user: obj.user,
        volume: obj.volume
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_QuobyteVolumeSource = toJson_QuobyteVolumeSource;
/**
 * Converts an object of type 'RbdPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RbdPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        image: obj.image,
        keyring: obj.keyring,
        monitors: obj.monitors?.map(y => y),
        pool: obj.pool,
        readOnly: obj.readOnly,
        secretRef: toJson_SecretReference(obj.secretRef),
        user: obj.user
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RbdPersistentVolumeSource = toJson_RbdPersistentVolumeSource;
/**
 * Converts an object of type 'ScaleIoPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ScaleIoPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        gateway: obj.gateway,
        protectionDomain: obj.protectionDomain,
        readOnly: obj.readOnly,
        secretRef: toJson_SecretReference(obj.secretRef),
        sslEnabled: obj.sslEnabled,
        storageMode: obj.storageMode,
        storagePool: obj.storagePool,
        system: obj.system,
        volumeName: obj.volumeName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ScaleIoPersistentVolumeSource = toJson_ScaleIoPersistentVolumeSource;
/**
 * Converts an object of type 'StorageOsPersistentVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StorageOsPersistentVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        readOnly: obj.readOnly,
        secretRef: toJson_ObjectReference(obj.secretRef),
        volumeName: obj.volumeName,
        volumeNamespace: obj.volumeNamespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StorageOsPersistentVolumeSource = toJson_StorageOsPersistentVolumeSource;
/**
 * Converts an object of type 'VsphereVirtualDiskVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VsphereVirtualDiskVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        storagePolicyID: obj.storagePolicyId,
        storagePolicyName: obj.storagePolicyName,
        volumePath: obj.volumePath
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VsphereVirtualDiskVolumeSource = toJson_VsphereVirtualDiskVolumeSource;
/**
 * Converts an object of type 'TypedLocalObjectReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TypedLocalObjectReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroup: obj.apiGroup,
        kind: obj.kind,
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TypedLocalObjectReference = toJson_TypedLocalObjectReference;
/**
 * Converts an object of type 'ResourceRequirements' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourceRequirements(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        limits: obj.limits === undefined ? undefined : Object.entries(obj.limits).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {}),
        requests: obj.requests === undefined ? undefined : Object.entries(obj.requests).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1]?.value }), {})
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourceRequirements = toJson_ResourceRequirements;
/**
 * Converts an object of type 'Affinity' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Affinity(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nodeAffinity: toJson_NodeAffinity(obj.nodeAffinity),
        podAffinity: toJson_PodAffinity(obj.podAffinity),
        podAntiAffinity: toJson_PodAntiAffinity(obj.podAntiAffinity)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Affinity = toJson_Affinity;
/**
 * Converts an object of type 'Container' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Container(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        args: obj.args?.map(y => y),
        command: obj.command?.map(y => y),
        env: obj.env?.map(y => toJson_EnvVar(y)),
        envFrom: obj.envFrom?.map(y => toJson_EnvFromSource(y)),
        image: obj.image,
        imagePullPolicy: obj.imagePullPolicy,
        lifecycle: toJson_Lifecycle(obj.lifecycle),
        livenessProbe: toJson_Probe(obj.livenessProbe),
        name: obj.name,
        ports: obj.ports?.map(y => toJson_ContainerPort(y)),
        readinessProbe: toJson_Probe(obj.readinessProbe),
        resources: toJson_ResourceRequirements(obj.resources),
        securityContext: toJson_SecurityContext(obj.securityContext),
        startupProbe: toJson_Probe(obj.startupProbe),
        stdin: obj.stdin,
        stdinOnce: obj.stdinOnce,
        terminationMessagePath: obj.terminationMessagePath,
        terminationMessagePolicy: obj.terminationMessagePolicy,
        tty: obj.tty,
        volumeDevices: obj.volumeDevices?.map(y => toJson_VolumeDevice(y)),
        volumeMounts: obj.volumeMounts?.map(y => toJson_VolumeMount(y)),
        workingDir: obj.workingDir
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Container = toJson_Container;
/**
 * Converts an object of type 'PodDnsConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodDnsConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nameservers: obj.nameservers?.map(y => y),
        options: obj.options?.map(y => toJson_PodDnsConfigOption(y)),
        searches: obj.searches?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodDnsConfig = toJson_PodDnsConfig;
/**
 * Converts an object of type 'EphemeralContainer' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EphemeralContainer(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        args: obj.args?.map(y => y),
        command: obj.command?.map(y => y),
        env: obj.env?.map(y => toJson_EnvVar(y)),
        envFrom: obj.envFrom?.map(y => toJson_EnvFromSource(y)),
        image: obj.image,
        imagePullPolicy: obj.imagePullPolicy,
        lifecycle: toJson_Lifecycle(obj.lifecycle),
        livenessProbe: toJson_Probe(obj.livenessProbe),
        name: obj.name,
        ports: obj.ports?.map(y => toJson_ContainerPort(y)),
        readinessProbe: toJson_Probe(obj.readinessProbe),
        resources: toJson_ResourceRequirements(obj.resources),
        securityContext: toJson_SecurityContext(obj.securityContext),
        startupProbe: toJson_Probe(obj.startupProbe),
        stdin: obj.stdin,
        stdinOnce: obj.stdinOnce,
        targetContainerName: obj.targetContainerName,
        terminationMessagePath: obj.terminationMessagePath,
        terminationMessagePolicy: obj.terminationMessagePolicy,
        tty: obj.tty,
        volumeDevices: obj.volumeDevices?.map(y => toJson_VolumeDevice(y)),
        volumeMounts: obj.volumeMounts?.map(y => toJson_VolumeMount(y)),
        workingDir: obj.workingDir
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EphemeralContainer = toJson_EphemeralContainer;
/**
 * Converts an object of type 'HostAlias' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HostAlias(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        hostnames: obj.hostnames?.map(y => y),
        ip: obj.ip
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HostAlias = toJson_HostAlias;
/**
 * Converts an object of type 'PodOs' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodOs(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodOs = toJson_PodOs;
/**
 * Converts an object of type 'PodReadinessGate' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodReadinessGate(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        conditionType: obj.conditionType
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodReadinessGate = toJson_PodReadinessGate;
/**
 * Converts an object of type 'PodSecurityContext' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodSecurityContext(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsGroup: obj.fsGroup,
        fsGroupChangePolicy: obj.fsGroupChangePolicy,
        runAsGroup: obj.runAsGroup,
        runAsNonRoot: obj.runAsNonRoot,
        runAsUser: obj.runAsUser,
        seLinuxOptions: toJson_SeLinuxOptions(obj.seLinuxOptions),
        seccompProfile: toJson_SeccompProfile(obj.seccompProfile),
        supplementalGroups: obj.supplementalGroups?.map(y => y),
        sysctls: obj.sysctls?.map(y => toJson_Sysctl(y)),
        windowsOptions: toJson_WindowsSecurityContextOptions(obj.windowsOptions)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodSecurityContext = toJson_PodSecurityContext;
/**
 * Converts an object of type 'Toleration' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Toleration(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        effect: obj.effect,
        key: obj.key,
        operator: obj.operator,
        tolerationSeconds: obj.tolerationSeconds,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Toleration = toJson_Toleration;
/**
 * Converts an object of type 'TopologySpreadConstraint' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TopologySpreadConstraint(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        labelSelector: toJson_LabelSelector(obj.labelSelector),
        matchLabelKeys: obj.matchLabelKeys?.map(y => y),
        maxSkew: obj.maxSkew,
        minDomains: obj.minDomains,
        nodeAffinityPolicy: obj.nodeAffinityPolicy,
        nodeTaintsPolicy: obj.nodeTaintsPolicy,
        topologyKey: obj.topologyKey,
        whenUnsatisfiable: obj.whenUnsatisfiable
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TopologySpreadConstraint = toJson_TopologySpreadConstraint;
/**
 * Converts an object of type 'Volume' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Volume(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        awsElasticBlockStore: toJson_AwsElasticBlockStoreVolumeSource(obj.awsElasticBlockStore),
        azureDisk: toJson_AzureDiskVolumeSource(obj.azureDisk),
        azureFile: toJson_AzureFileVolumeSource(obj.azureFile),
        cephfs: toJson_CephFsVolumeSource(obj.cephfs),
        cinder: toJson_CinderVolumeSource(obj.cinder),
        configMap: toJson_ConfigMapVolumeSource(obj.configMap),
        csi: toJson_CsiVolumeSource(obj.csi),
        downwardAPI: toJson_DownwardApiVolumeSource(obj.downwardApi),
        emptyDir: toJson_EmptyDirVolumeSource(obj.emptyDir),
        ephemeral: toJson_EphemeralVolumeSource(obj.ephemeral),
        fc: toJson_FcVolumeSource(obj.fc),
        flexVolume: toJson_FlexVolumeSource(obj.flexVolume),
        flocker: toJson_FlockerVolumeSource(obj.flocker),
        gcePersistentDisk: toJson_GcePersistentDiskVolumeSource(obj.gcePersistentDisk),
        gitRepo: toJson_GitRepoVolumeSource(obj.gitRepo),
        glusterfs: toJson_GlusterfsVolumeSource(obj.glusterfs),
        hostPath: toJson_HostPathVolumeSource(obj.hostPath),
        iscsi: toJson_IscsiVolumeSource(obj.iscsi),
        name: obj.name,
        nfs: toJson_NfsVolumeSource(obj.nfs),
        persistentVolumeClaim: toJson_PersistentVolumeClaimVolumeSource(obj.persistentVolumeClaim),
        photonPersistentDisk: toJson_PhotonPersistentDiskVolumeSource(obj.photonPersistentDisk),
        portworxVolume: toJson_PortworxVolumeSource(obj.portworxVolume),
        projected: toJson_ProjectedVolumeSource(obj.projected),
        quobyte: toJson_QuobyteVolumeSource(obj.quobyte),
        rbd: toJson_RbdVolumeSource(obj.rbd),
        scaleIO: toJson_ScaleIoVolumeSource(obj.scaleIo),
        secret: toJson_SecretVolumeSource(obj.secret),
        storageos: toJson_StorageOsVolumeSource(obj.storageos),
        vsphereVolume: toJson_VsphereVirtualDiskVolumeSource(obj.vsphereVolume)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Volume = toJson_Volume;
/**
 * Converts an object of type 'ScopeSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ScopeSelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        matchExpressions: obj.matchExpressions?.map(y => toJson_ScopedResourceSelectorRequirement(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ScopeSelector = toJson_ScopeSelector;
/**
 * Converts an object of type 'ServicePort' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServicePort(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        appProtocol: obj.appProtocol,
        name: obj.name,
        nodePort: obj.nodePort,
        port: obj.port,
        protocol: obj.protocol,
        targetPort: obj.targetPort?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServicePort = toJson_ServicePort;
/**
 * Converts an object of type 'SessionAffinityConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SessionAffinityConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        clientIP: toJson_ClientIpConfig(obj.clientIp)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SessionAffinityConfig = toJson_SessionAffinityConfig;
/**
 * Converts an object of type 'EndpointConditions' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EndpointConditions(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        ready: obj.ready,
        serving: obj.serving,
        terminating: obj.terminating
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EndpointConditions = toJson_EndpointConditions;
/**
 * Converts an object of type 'EndpointHints' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EndpointHints(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        forZones: obj.forZones?.map(y => toJson_ForZone(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EndpointHints = toJson_EndpointHints;
/**
 * Converts an object of type 'FlowDistinguisherMethodV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlowDistinguisherMethodV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlowDistinguisherMethodV1Beta1 = toJson_FlowDistinguisherMethodV1Beta1;
/**
 * Converts an object of type 'PriorityLevelConfigurationReferenceV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PriorityLevelConfigurationReferenceV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PriorityLevelConfigurationReferenceV1Beta1 = toJson_PriorityLevelConfigurationReferenceV1Beta1;
/**
 * Converts an object of type 'PolicyRulesWithSubjectsV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PolicyRulesWithSubjectsV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nonResourceRules: obj.nonResourceRules?.map(y => toJson_NonResourcePolicyRuleV1Beta1(y)),
        resourceRules: obj.resourceRules?.map(y => toJson_ResourcePolicyRuleV1Beta1(y)),
        subjects: obj.subjects?.map(y => toJson_SubjectV1Beta1(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PolicyRulesWithSubjectsV1Beta1 = toJson_PolicyRulesWithSubjectsV1Beta1;
/**
 * Converts an object of type 'LimitedPriorityLevelConfigurationV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LimitedPriorityLevelConfigurationV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        assuredConcurrencyShares: obj.assuredConcurrencyShares,
        limitResponse: toJson_LimitResponseV1Beta1(obj.limitResponse)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LimitedPriorityLevelConfigurationV1Beta1 = toJson_LimitedPriorityLevelConfigurationV1Beta1;
/**
 * Converts an object of type 'FlowDistinguisherMethodV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlowDistinguisherMethodV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlowDistinguisherMethodV1Beta2 = toJson_FlowDistinguisherMethodV1Beta2;
/**
 * Converts an object of type 'PriorityLevelConfigurationReferenceV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PriorityLevelConfigurationReferenceV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PriorityLevelConfigurationReferenceV1Beta2 = toJson_PriorityLevelConfigurationReferenceV1Beta2;
/**
 * Converts an object of type 'PolicyRulesWithSubjectsV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PolicyRulesWithSubjectsV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nonResourceRules: obj.nonResourceRules?.map(y => toJson_NonResourcePolicyRuleV1Beta2(y)),
        resourceRules: obj.resourceRules?.map(y => toJson_ResourcePolicyRuleV1Beta2(y)),
        subjects: obj.subjects?.map(y => toJson_SubjectV1Beta2(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PolicyRulesWithSubjectsV1Beta2 = toJson_PolicyRulesWithSubjectsV1Beta2;
/**
 * Converts an object of type 'LimitedPriorityLevelConfigurationV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LimitedPriorityLevelConfigurationV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        assuredConcurrencyShares: obj.assuredConcurrencyShares,
        limitResponse: toJson_LimitResponseV1Beta2(obj.limitResponse)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LimitedPriorityLevelConfigurationV1Beta2 = toJson_LimitedPriorityLevelConfigurationV1Beta2;
/**
 * Converts an object of type 'IngressBackend' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressBackend(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        resource: toJson_TypedLocalObjectReference(obj.resource),
        service: toJson_IngressServiceBackend(obj.service)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressBackend = toJson_IngressBackend;
/**
 * Converts an object of type 'IngressRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        host: obj.host,
        http: toJson_HttpIngressRuleValue(obj.http)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressRule = toJson_IngressRule;
/**
 * Converts an object of type 'IngressTls' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressTls(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        hosts: obj.hosts?.map(y => y),
        secretName: obj.secretName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressTls = toJson_IngressTls;
/**
 * Converts an object of type 'IngressClassParametersReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressClassParametersReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroup: obj.apiGroup,
        kind: obj.kind,
        name: obj.name,
        namespace: obj.namespace,
        scope: obj.scope
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressClassParametersReference = toJson_IngressClassParametersReference;
/**
 * Converts an object of type 'NetworkPolicyEgressRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NetworkPolicyEgressRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        ports: obj.ports?.map(y => toJson_NetworkPolicyPort(y)),
        to: obj.to?.map(y => toJson_NetworkPolicyPeer(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NetworkPolicyEgressRule = toJson_NetworkPolicyEgressRule;
/**
 * Converts an object of type 'NetworkPolicyIngressRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NetworkPolicyIngressRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        from: obj.from?.map(y => toJson_NetworkPolicyPeer(y)),
        ports: obj.ports?.map(y => toJson_NetworkPolicyPort(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NetworkPolicyIngressRule = toJson_NetworkPolicyIngressRule;
/**
 * Converts an object of type 'NodeSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NodeSelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nodeSelectorTerms: obj.nodeSelectorTerms?.map(y => toJson_NodeSelectorTerm(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NodeSelector = toJson_NodeSelector;
/* eslint-enable max-len, quote-props */
/**
 * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
 *
 * @schema IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind
 */
var IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind;
(function (IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind) {
    /** DeleteOptions */
    IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind["DELETE_OPTIONS"] = "DeleteOptions";
})(IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind || (exports.IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind = IoK8SApimachineryPkgApisMetaV1DeleteOptionsKind = {}));
/**
 * Converts an object of type 'Preconditions' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Preconditions(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        resourceVersion: obj.resourceVersion,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Preconditions = toJson_Preconditions;
/* eslint-enable max-len, quote-props */
/**
 * @schema io.k8s.apimachinery.pkg.util.intstr.IntOrString
 */
class IntOrString {
    value;
    static fromString(value) {
        return new IntOrString(value);
    }
    static fromNumber(value) {
        return new IntOrString(value);
    }
    constructor(value) {
        this.value = value;
    }
}
exports.IntOrString = IntOrString;
/**
 * Converts an object of type 'TokenRequest' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TokenRequest(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        audience: obj.audience,
        expirationSeconds: obj.expirationSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TokenRequest = toJson_TokenRequest;
/**
 * Converts an object of type 'CsiNodeDriver' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CsiNodeDriver(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        allocatable: toJson_VolumeNodeResources(obj.allocatable),
        name: obj.name,
        nodeID: obj.nodeId,
        topologyKeys: obj.topologyKeys?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CsiNodeDriver = toJson_CsiNodeDriver;
/**
 * Converts an object of type 'LabelSelectorRequirement' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LabelSelectorRequirement(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        key: obj.key,
        operator: obj.operator,
        values: obj.values?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LabelSelectorRequirement = toJson_LabelSelectorRequirement;
/**
 * Converts an object of type 'TopologySelectorLabelRequirement' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TopologySelectorLabelRequirement(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        key: obj.key,
        values: obj.values?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TopologySelectorLabelRequirement = toJson_TopologySelectorLabelRequirement;
/**
 * Converts an object of type 'VolumeAttachmentSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeAttachmentSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        inlineVolumeSpec: toJson_PersistentVolumeSpec(obj.inlineVolumeSpec),
        persistentVolumeName: obj.persistentVolumeName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeAttachmentSource = toJson_VolumeAttachmentSource;
/**
 * Converts an object of type 'CustomResourceConversion' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceConversion(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        strategy: obj.strategy,
        webhook: toJson_WebhookConversion(obj.webhook)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceConversion = toJson_CustomResourceConversion;
/**
 * Converts an object of type 'CustomResourceDefinitionNames' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceDefinitionNames(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        categories: obj.categories?.map(y => y),
        kind: obj.kind,
        listKind: obj.listKind,
        plural: obj.plural,
        shortNames: obj.shortNames?.map(y => y),
        singular: obj.singular
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceDefinitionNames = toJson_CustomResourceDefinitionNames;
/**
 * Converts an object of type 'CustomResourceDefinitionVersion' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceDefinitionVersion(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        additionalPrinterColumns: obj.additionalPrinterColumns?.map(y => toJson_CustomResourceColumnDefinition(y)),
        deprecated: obj.deprecated,
        deprecationWarning: obj.deprecationWarning,
        name: obj.name,
        schema: toJson_CustomResourceValidation(obj.schema),
        served: obj.served,
        storage: obj.storage,
        subresources: toJson_CustomResourceSubresources(obj.subresources)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceDefinitionVersion = toJson_CustomResourceDefinitionVersion;
/**
 * Converts an object of type 'StatusCause' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StatusCause(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        field: obj.field,
        message: obj.message,
        reason: obj.reason
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StatusCause = toJson_StatusCause;
/**
 * Converts an object of type 'ServiceReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServiceReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        namespace: obj.namespace,
        path: obj.path,
        port: obj.port
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServiceReference = toJson_ServiceReference;
/**
 * Converts an object of type 'RollingUpdateDaemonSet' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RollingUpdateDaemonSet(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        maxSurge: obj.maxSurge?.value,
        maxUnavailable: obj.maxUnavailable?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RollingUpdateDaemonSet = toJson_RollingUpdateDaemonSet;
/**
 * Converts an object of type 'RollingUpdateDeployment' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RollingUpdateDeployment(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        maxSurge: obj.maxSurge?.value,
        maxUnavailable: obj.maxUnavailable?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RollingUpdateDeployment = toJson_RollingUpdateDeployment;
/**
 * Converts an object of type 'RollingUpdateStatefulSetStrategy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RollingUpdateStatefulSetStrategy(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        maxUnavailable: obj.maxUnavailable?.value,
        partition: obj.partition
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RollingUpdateStatefulSetStrategy = toJson_RollingUpdateStatefulSetStrategy;
/**
 * Converts an object of type 'HpaScalingRulesV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HpaScalingRulesV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        policies: obj.policies?.map(y => toJson_HpaScalingPolicyV2(y)),
        selectPolicy: obj.selectPolicy,
        stabilizationWindowSeconds: obj.stabilizationWindowSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HpaScalingRulesV2 = toJson_HpaScalingRulesV2;
/**
 * Converts an object of type 'ContainerResourceMetricSourceV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ContainerResourceMetricSourceV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        container: obj.container,
        name: obj.name,
        target: toJson_MetricTargetV2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ContainerResourceMetricSourceV2 = toJson_ContainerResourceMetricSourceV2;
/**
 * Converts an object of type 'ExternalMetricSourceV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ExternalMetricSourceV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metric: toJson_MetricIdentifierV2(obj.metric),
        target: toJson_MetricTargetV2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ExternalMetricSourceV2 = toJson_ExternalMetricSourceV2;
/**
 * Converts an object of type 'ObjectMetricSourceV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ObjectMetricSourceV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        describedObject: toJson_CrossVersionObjectReferenceV2(obj.describedObject),
        metric: toJson_MetricIdentifierV2(obj.metric),
        target: toJson_MetricTargetV2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ObjectMetricSourceV2 = toJson_ObjectMetricSourceV2;
/**
 * Converts an object of type 'PodsMetricSourceV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodsMetricSourceV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metric: toJson_MetricIdentifierV2(obj.metric),
        target: toJson_MetricTargetV2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodsMetricSourceV2 = toJson_PodsMetricSourceV2;
/**
 * Converts an object of type 'ResourceMetricSourceV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourceMetricSourceV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        target: toJson_MetricTargetV2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourceMetricSourceV2 = toJson_ResourceMetricSourceV2;
/**
 * Converts an object of type 'HpaScalingRulesV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HpaScalingRulesV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        policies: obj.policies?.map(y => toJson_HpaScalingPolicyV2Beta2(y)),
        selectPolicy: obj.selectPolicy,
        stabilizationWindowSeconds: obj.stabilizationWindowSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HpaScalingRulesV2Beta2 = toJson_HpaScalingRulesV2Beta2;
/**
 * Converts an object of type 'ContainerResourceMetricSourceV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ContainerResourceMetricSourceV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        container: obj.container,
        name: obj.name,
        target: toJson_MetricTargetV2Beta2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ContainerResourceMetricSourceV2Beta2 = toJson_ContainerResourceMetricSourceV2Beta2;
/**
 * Converts an object of type 'ExternalMetricSourceV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ExternalMetricSourceV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metric: toJson_MetricIdentifierV2Beta2(obj.metric),
        target: toJson_MetricTargetV2Beta2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ExternalMetricSourceV2Beta2 = toJson_ExternalMetricSourceV2Beta2;
/**
 * Converts an object of type 'ObjectMetricSourceV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ObjectMetricSourceV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        describedObject: toJson_CrossVersionObjectReferenceV2Beta2(obj.describedObject),
        metric: toJson_MetricIdentifierV2Beta2(obj.metric),
        target: toJson_MetricTargetV2Beta2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ObjectMetricSourceV2Beta2 = toJson_ObjectMetricSourceV2Beta2;
/**
 * Converts an object of type 'PodsMetricSourceV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodsMetricSourceV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metric: toJson_MetricIdentifierV2Beta2(obj.metric),
        target: toJson_MetricTargetV2Beta2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodsMetricSourceV2Beta2 = toJson_PodsMetricSourceV2Beta2;
/**
 * Converts an object of type 'ResourceMetricSourceV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourceMetricSourceV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        target: toJson_MetricTargetV2Beta2(obj.target)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourceMetricSourceV2Beta2 = toJson_ResourceMetricSourceV2Beta2;
/**
 * Converts an object of type 'PodFailurePolicyRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodFailurePolicyRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        action: obj.action,
        onExitCodes: toJson_PodFailurePolicyOnExitCodesRequirement(obj.onExitCodes),
        onPodConditions: obj.onPodConditions?.map(y => toJson_PodFailurePolicyOnPodConditionsPattern(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodFailurePolicyRule = toJson_PodFailurePolicyRule;
/**
 * Converts an object of type 'ConfigMapNodeConfigSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ConfigMapNodeConfigSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        kubeletConfigKey: obj.kubeletConfigKey,
        name: obj.name,
        namespace: obj.namespace,
        resourceVersion: obj.resourceVersion,
        uid: obj.uid
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ConfigMapNodeConfigSource = toJson_ConfigMapNodeConfigSource;
/**
 * Converts an object of type 'SecretReference' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SecretReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        namespace: obj.namespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SecretReference = toJson_SecretReference;
/**
 * Converts an object of type 'NodeAffinity' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NodeAffinity(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        preferredDuringSchedulingIgnoredDuringExecution: obj.preferredDuringSchedulingIgnoredDuringExecution?.map(y => toJson_PreferredSchedulingTerm(y)),
        requiredDuringSchedulingIgnoredDuringExecution: toJson_NodeSelector(obj.requiredDuringSchedulingIgnoredDuringExecution)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NodeAffinity = toJson_NodeAffinity;
/**
 * Converts an object of type 'PodAffinity' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodAffinity(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        preferredDuringSchedulingIgnoredDuringExecution: obj.preferredDuringSchedulingIgnoredDuringExecution?.map(y => toJson_WeightedPodAffinityTerm(y)),
        requiredDuringSchedulingIgnoredDuringExecution: obj.requiredDuringSchedulingIgnoredDuringExecution?.map(y => toJson_PodAffinityTerm(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodAffinity = toJson_PodAffinity;
/**
 * Converts an object of type 'PodAntiAffinity' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodAntiAffinity(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        preferredDuringSchedulingIgnoredDuringExecution: obj.preferredDuringSchedulingIgnoredDuringExecution?.map(y => toJson_WeightedPodAffinityTerm(y)),
        requiredDuringSchedulingIgnoredDuringExecution: obj.requiredDuringSchedulingIgnoredDuringExecution?.map(y => toJson_PodAffinityTerm(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodAntiAffinity = toJson_PodAntiAffinity;
/**
 * Converts an object of type 'EnvVar' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EnvVar(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        value: obj.value,
        valueFrom: toJson_EnvVarSource(obj.valueFrom)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EnvVar = toJson_EnvVar;
/**
 * Converts an object of type 'EnvFromSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EnvFromSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        configMapRef: toJson_ConfigMapEnvSource(obj.configMapRef),
        prefix: obj.prefix,
        secretRef: toJson_SecretEnvSource(obj.secretRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EnvFromSource = toJson_EnvFromSource;
/**
 * Converts an object of type 'Lifecycle' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Lifecycle(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        postStart: toJson_LifecycleHandler(obj.postStart),
        preStop: toJson_LifecycleHandler(obj.preStop)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Lifecycle = toJson_Lifecycle;
/**
 * Converts an object of type 'Probe' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Probe(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        exec: toJson_ExecAction(obj.exec),
        failureThreshold: obj.failureThreshold,
        grpc: toJson_GrpcAction(obj.grpc),
        httpGet: toJson_HttpGetAction(obj.httpGet),
        initialDelaySeconds: obj.initialDelaySeconds,
        periodSeconds: obj.periodSeconds,
        successThreshold: obj.successThreshold,
        tcpSocket: toJson_TcpSocketAction(obj.tcpSocket),
        terminationGracePeriodSeconds: obj.terminationGracePeriodSeconds,
        timeoutSeconds: obj.timeoutSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Probe = toJson_Probe;
/**
 * Converts an object of type 'ContainerPort' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ContainerPort(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        containerPort: obj.containerPort,
        hostIP: obj.hostIp,
        hostPort: obj.hostPort,
        name: obj.name,
        protocol: obj.protocol
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ContainerPort = toJson_ContainerPort;
/**
 * Converts an object of type 'SecurityContext' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SecurityContext(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        allowPrivilegeEscalation: obj.allowPrivilegeEscalation,
        capabilities: toJson_Capabilities(obj.capabilities),
        privileged: obj.privileged,
        procMount: obj.procMount,
        readOnlyRootFilesystem: obj.readOnlyRootFilesystem,
        runAsGroup: obj.runAsGroup,
        runAsNonRoot: obj.runAsNonRoot,
        runAsUser: obj.runAsUser,
        seLinuxOptions: toJson_SeLinuxOptions(obj.seLinuxOptions),
        seccompProfile: toJson_SeccompProfile(obj.seccompProfile),
        windowsOptions: toJson_WindowsSecurityContextOptions(obj.windowsOptions)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SecurityContext = toJson_SecurityContext;
/**
 * Converts an object of type 'VolumeDevice' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeDevice(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        devicePath: obj.devicePath,
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeDevice = toJson_VolumeDevice;
/**
 * Converts an object of type 'VolumeMount' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeMount(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        mountPath: obj.mountPath,
        mountPropagation: obj.mountPropagation,
        name: obj.name,
        readOnly: obj.readOnly,
        subPath: obj.subPath,
        subPathExpr: obj.subPathExpr
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeMount = toJson_VolumeMount;
/**
 * Converts an object of type 'PodDnsConfigOption' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodDnsConfigOption(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodDnsConfigOption = toJson_PodDnsConfigOption;
/**
 * Converts an object of type 'SeLinuxOptions' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SeLinuxOptions(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        level: obj.level,
        role: obj.role,
        type: obj.type,
        user: obj.user
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SeLinuxOptions = toJson_SeLinuxOptions;
/**
 * Converts an object of type 'SeccompProfile' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SeccompProfile(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        localhostProfile: obj.localhostProfile,
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SeccompProfile = toJson_SeccompProfile;
/**
 * Converts an object of type 'Sysctl' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Sysctl(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Sysctl = toJson_Sysctl;
/**
 * Converts an object of type 'WindowsSecurityContextOptions' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_WindowsSecurityContextOptions(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        gmsaCredentialSpec: obj.gmsaCredentialSpec,
        gmsaCredentialSpecName: obj.gmsaCredentialSpecName,
        hostProcess: obj.hostProcess,
        runAsUserName: obj.runAsUserName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_WindowsSecurityContextOptions = toJson_WindowsSecurityContextOptions;
/**
 * Converts an object of type 'AzureFileVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_AzureFileVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        readOnly: obj.readOnly,
        secretName: obj.secretName,
        shareName: obj.shareName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_AzureFileVolumeSource = toJson_AzureFileVolumeSource;
/**
 * Converts an object of type 'CephFsVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CephFsVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        monitors: obj.monitors?.map(y => y),
        path: obj.path,
        readOnly: obj.readOnly,
        secretFile: obj.secretFile,
        secretRef: toJson_LocalObjectReference(obj.secretRef),
        user: obj.user
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CephFsVolumeSource = toJson_CephFsVolumeSource;
/**
 * Converts an object of type 'CinderVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CinderVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        readOnly: obj.readOnly,
        secretRef: toJson_LocalObjectReference(obj.secretRef),
        volumeID: obj.volumeId
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CinderVolumeSource = toJson_CinderVolumeSource;
/**
 * Converts an object of type 'ConfigMapVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ConfigMapVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        defaultMode: obj.defaultMode,
        items: obj.items?.map(y => toJson_KeyToPath(y)),
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ConfigMapVolumeSource = toJson_ConfigMapVolumeSource;
/**
 * Converts an object of type 'CsiVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CsiVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        driver: obj.driver,
        fsType: obj.fsType,
        nodePublishSecretRef: toJson_LocalObjectReference(obj.nodePublishSecretRef),
        readOnly: obj.readOnly,
        volumeAttributes: obj.volumeAttributes === undefined ? undefined : Object.entries(obj.volumeAttributes).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {})
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CsiVolumeSource = toJson_CsiVolumeSource;
/**
 * Converts an object of type 'DownwardApiVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DownwardApiVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        defaultMode: obj.defaultMode,
        items: obj.items?.map(y => toJson_DownwardApiVolumeFile(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DownwardApiVolumeSource = toJson_DownwardApiVolumeSource;
/**
 * Converts an object of type 'EmptyDirVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EmptyDirVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        medium: obj.medium,
        sizeLimit: obj.sizeLimit?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EmptyDirVolumeSource = toJson_EmptyDirVolumeSource;
/**
 * Converts an object of type 'EphemeralVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EphemeralVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        volumeClaimTemplate: toJson_PersistentVolumeClaimTemplate(obj.volumeClaimTemplate)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EphemeralVolumeSource = toJson_EphemeralVolumeSource;
/**
 * Converts an object of type 'FlexVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_FlexVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        driver: obj.driver,
        fsType: obj.fsType,
        options: obj.options === undefined ? undefined : Object.entries(obj.options).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        readOnly: obj.readOnly,
        secretRef: toJson_LocalObjectReference(obj.secretRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_FlexVolumeSource = toJson_FlexVolumeSource;
/**
 * Converts an object of type 'GitRepoVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GitRepoVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        directory: obj.directory,
        repository: obj.repository,
        revision: obj.revision
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GitRepoVolumeSource = toJson_GitRepoVolumeSource;
/**
 * Converts an object of type 'GlusterfsVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GlusterfsVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        endpoints: obj.endpoints,
        path: obj.path,
        readOnly: obj.readOnly
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GlusterfsVolumeSource = toJson_GlusterfsVolumeSource;
/**
 * Converts an object of type 'IscsiVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IscsiVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        chapAuthDiscovery: obj.chapAuthDiscovery,
        chapAuthSession: obj.chapAuthSession,
        fsType: obj.fsType,
        initiatorName: obj.initiatorName,
        iqn: obj.iqn,
        iscsiInterface: obj.iscsiInterface,
        lun: obj.lun,
        portals: obj.portals?.map(y => y),
        readOnly: obj.readOnly,
        secretRef: toJson_LocalObjectReference(obj.secretRef),
        targetPortal: obj.targetPortal
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IscsiVolumeSource = toJson_IscsiVolumeSource;
/**
 * Converts an object of type 'PersistentVolumeClaimVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PersistentVolumeClaimVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        claimName: obj.claimName,
        readOnly: obj.readOnly
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PersistentVolumeClaimVolumeSource = toJson_PersistentVolumeClaimVolumeSource;
/**
 * Converts an object of type 'ProjectedVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ProjectedVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        defaultMode: obj.defaultMode,
        sources: obj.sources?.map(y => toJson_VolumeProjection(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ProjectedVolumeSource = toJson_ProjectedVolumeSource;
/**
 * Converts an object of type 'RbdVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_RbdVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        image: obj.image,
        keyring: obj.keyring,
        monitors: obj.monitors?.map(y => y),
        pool: obj.pool,
        readOnly: obj.readOnly,
        secretRef: toJson_LocalObjectReference(obj.secretRef),
        user: obj.user
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_RbdVolumeSource = toJson_RbdVolumeSource;
/**
 * Converts an object of type 'ScaleIoVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ScaleIoVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        gateway: obj.gateway,
        protectionDomain: obj.protectionDomain,
        readOnly: obj.readOnly,
        secretRef: toJson_LocalObjectReference(obj.secretRef),
        sslEnabled: obj.sslEnabled,
        storageMode: obj.storageMode,
        storagePool: obj.storagePool,
        system: obj.system,
        volumeName: obj.volumeName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ScaleIoVolumeSource = toJson_ScaleIoVolumeSource;
/**
 * Converts an object of type 'SecretVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SecretVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        defaultMode: obj.defaultMode,
        items: obj.items?.map(y => toJson_KeyToPath(y)),
        optional: obj.optional,
        secretName: obj.secretName
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SecretVolumeSource = toJson_SecretVolumeSource;
/**
 * Converts an object of type 'StorageOsVolumeSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_StorageOsVolumeSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fsType: obj.fsType,
        readOnly: obj.readOnly,
        secretRef: toJson_LocalObjectReference(obj.secretRef),
        volumeName: obj.volumeName,
        volumeNamespace: obj.volumeNamespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_StorageOsVolumeSource = toJson_StorageOsVolumeSource;
/**
 * Converts an object of type 'ScopedResourceSelectorRequirement' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ScopedResourceSelectorRequirement(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        operator: obj.operator,
        scopeName: obj.scopeName,
        values: obj.values?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ScopedResourceSelectorRequirement = toJson_ScopedResourceSelectorRequirement;
/**
 * Converts an object of type 'ClientIpConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ClientIpConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        timeoutSeconds: obj.timeoutSeconds
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ClientIpConfig = toJson_ClientIpConfig;
/**
 * Converts an object of type 'ForZone' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ForZone(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ForZone = toJson_ForZone;
/**
 * Converts an object of type 'NonResourcePolicyRuleV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NonResourcePolicyRuleV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nonResourceURLs: obj.nonResourceUrLs?.map(y => y),
        verbs: obj.verbs?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NonResourcePolicyRuleV1Beta1 = toJson_NonResourcePolicyRuleV1Beta1;
/**
 * Converts an object of type 'ResourcePolicyRuleV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourcePolicyRuleV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroups: obj.apiGroups?.map(y => y),
        clusterScope: obj.clusterScope,
        namespaces: obj.namespaces?.map(y => y),
        resources: obj.resources?.map(y => y),
        verbs: obj.verbs?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourcePolicyRuleV1Beta1 = toJson_ResourcePolicyRuleV1Beta1;
/**
 * Converts an object of type 'SubjectV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SubjectV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        group: toJson_GroupSubjectV1Beta1(obj.group),
        kind: obj.kind,
        serviceAccount: toJson_ServiceAccountSubjectV1Beta1(obj.serviceAccount),
        user: toJson_UserSubjectV1Beta1(obj.user)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SubjectV1Beta1 = toJson_SubjectV1Beta1;
/**
 * Converts an object of type 'LimitResponseV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LimitResponseV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        queuing: toJson_QueuingConfigurationV1Beta1(obj.queuing),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LimitResponseV1Beta1 = toJson_LimitResponseV1Beta1;
/**
 * Converts an object of type 'NonResourcePolicyRuleV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NonResourcePolicyRuleV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nonResourceURLs: obj.nonResourceUrLs?.map(y => y),
        verbs: obj.verbs?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NonResourcePolicyRuleV1Beta2 = toJson_NonResourcePolicyRuleV1Beta2;
/**
 * Converts an object of type 'ResourcePolicyRuleV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourcePolicyRuleV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiGroups: obj.apiGroups?.map(y => y),
        clusterScope: obj.clusterScope,
        namespaces: obj.namespaces?.map(y => y),
        resources: obj.resources?.map(y => y),
        verbs: obj.verbs?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourcePolicyRuleV1Beta2 = toJson_ResourcePolicyRuleV1Beta2;
/**
 * Converts an object of type 'SubjectV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SubjectV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        group: toJson_GroupSubjectV1Beta2(obj.group),
        kind: obj.kind,
        serviceAccount: toJson_ServiceAccountSubjectV1Beta2(obj.serviceAccount),
        user: toJson_UserSubjectV1Beta2(obj.user)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SubjectV1Beta2 = toJson_SubjectV1Beta2;
/**
 * Converts an object of type 'LimitResponseV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LimitResponseV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        queuing: toJson_QueuingConfigurationV1Beta2(obj.queuing),
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LimitResponseV1Beta2 = toJson_LimitResponseV1Beta2;
/**
 * Converts an object of type 'IngressServiceBackend' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IngressServiceBackend(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        port: toJson_ServiceBackendPort(obj.port)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IngressServiceBackend = toJson_IngressServiceBackend;
/**
 * Converts an object of type 'HttpIngressRuleValue' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HttpIngressRuleValue(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        paths: obj.paths?.map(y => toJson_HttpIngressPath(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HttpIngressRuleValue = toJson_HttpIngressRuleValue;
/**
 * Converts an object of type 'NetworkPolicyPort' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NetworkPolicyPort(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        endPort: obj.endPort,
        port: obj.port?.value,
        protocol: obj.protocol
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NetworkPolicyPort = toJson_NetworkPolicyPort;
/**
 * Converts an object of type 'NetworkPolicyPeer' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NetworkPolicyPeer(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        ipBlock: toJson_IpBlock(obj.ipBlock),
        namespaceSelector: toJson_LabelSelector(obj.namespaceSelector),
        podSelector: toJson_LabelSelector(obj.podSelector)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NetworkPolicyPeer = toJson_NetworkPolicyPeer;
/**
 * Converts an object of type 'NodeSelectorTerm' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NodeSelectorTerm(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        matchExpressions: obj.matchExpressions?.map(y => toJson_NodeSelectorRequirement(y)),
        matchFields: obj.matchFields?.map(y => toJson_NodeSelectorRequirement(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NodeSelectorTerm = toJson_NodeSelectorTerm;
/**
 * Converts an object of type 'VolumeNodeResources' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeNodeResources(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        count: obj.count
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeNodeResources = toJson_VolumeNodeResources;
/**
 * Converts an object of type 'WebhookConversion' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_WebhookConversion(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        clientConfig: toJson_WebhookClientConfig(obj.clientConfig),
        conversionReviewVersions: obj.conversionReviewVersions?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_WebhookConversion = toJson_WebhookConversion;
/**
 * Converts an object of type 'CustomResourceColumnDefinition' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceColumnDefinition(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        description: obj.description,
        format: obj.format,
        jsonPath: obj.jsonPath,
        name: obj.name,
        priority: obj.priority,
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceColumnDefinition = toJson_CustomResourceColumnDefinition;
/**
 * Converts an object of type 'CustomResourceValidation' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceValidation(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        openAPIV3Schema: toJson_JsonSchemaProps(obj.openApiv3Schema)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceValidation = toJson_CustomResourceValidation;
/**
 * Converts an object of type 'CustomResourceSubresources' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceSubresources(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        scale: toJson_CustomResourceSubresourceScale(obj.scale),
        status: obj.status
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceSubresources = toJson_CustomResourceSubresources;
/**
 * Converts an object of type 'HpaScalingPolicyV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HpaScalingPolicyV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        periodSeconds: obj.periodSeconds,
        type: obj.type,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HpaScalingPolicyV2 = toJson_HpaScalingPolicyV2;
/**
 * Converts an object of type 'MetricTargetV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MetricTargetV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        averageUtilization: obj.averageUtilization,
        averageValue: obj.averageValue?.value,
        type: obj.type,
        value: obj.value?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MetricTargetV2 = toJson_MetricTargetV2;
/**
 * Converts an object of type 'MetricIdentifierV2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MetricIdentifierV2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        selector: toJson_LabelSelector(obj.selector)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MetricIdentifierV2 = toJson_MetricIdentifierV2;
/**
 * Converts an object of type 'HpaScalingPolicyV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HpaScalingPolicyV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        periodSeconds: obj.periodSeconds,
        type: obj.type,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HpaScalingPolicyV2Beta2 = toJson_HpaScalingPolicyV2Beta2;
/**
 * Converts an object of type 'MetricTargetV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MetricTargetV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        averageUtilization: obj.averageUtilization,
        averageValue: obj.averageValue?.value,
        type: obj.type,
        value: obj.value?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MetricTargetV2Beta2 = toJson_MetricTargetV2Beta2;
/**
 * Converts an object of type 'MetricIdentifierV2Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_MetricIdentifierV2Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        selector: toJson_LabelSelector(obj.selector)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_MetricIdentifierV2Beta2 = toJson_MetricIdentifierV2Beta2;
/**
 * Converts an object of type 'PodFailurePolicyOnExitCodesRequirement' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodFailurePolicyOnExitCodesRequirement(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        containerName: obj.containerName,
        operator: obj.operator,
        values: obj.values?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodFailurePolicyOnExitCodesRequirement = toJson_PodFailurePolicyOnExitCodesRequirement;
/**
 * Converts an object of type 'PodFailurePolicyOnPodConditionsPattern' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodFailurePolicyOnPodConditionsPattern(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        status: obj.status,
        type: obj.type
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodFailurePolicyOnPodConditionsPattern = toJson_PodFailurePolicyOnPodConditionsPattern;
/**
 * Converts an object of type 'PreferredSchedulingTerm' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PreferredSchedulingTerm(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        preference: toJson_NodeSelectorTerm(obj.preference),
        weight: obj.weight
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PreferredSchedulingTerm = toJson_PreferredSchedulingTerm;
/**
 * Converts an object of type 'WeightedPodAffinityTerm' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_WeightedPodAffinityTerm(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        podAffinityTerm: toJson_PodAffinityTerm(obj.podAffinityTerm),
        weight: obj.weight
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_WeightedPodAffinityTerm = toJson_WeightedPodAffinityTerm;
/**
 * Converts an object of type 'PodAffinityTerm' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PodAffinityTerm(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        labelSelector: toJson_LabelSelector(obj.labelSelector),
        namespaceSelector: toJson_LabelSelector(obj.namespaceSelector),
        namespaces: obj.namespaces?.map(y => y),
        topologyKey: obj.topologyKey
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PodAffinityTerm = toJson_PodAffinityTerm;
/**
 * Converts an object of type 'EnvVarSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_EnvVarSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        configMapKeyRef: toJson_ConfigMapKeySelector(obj.configMapKeyRef),
        fieldRef: toJson_ObjectFieldSelector(obj.fieldRef),
        resourceFieldRef: toJson_ResourceFieldSelector(obj.resourceFieldRef),
        secretKeyRef: toJson_SecretKeySelector(obj.secretKeyRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_EnvVarSource = toJson_EnvVarSource;
/**
 * Converts an object of type 'ConfigMapEnvSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ConfigMapEnvSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ConfigMapEnvSource = toJson_ConfigMapEnvSource;
/**
 * Converts an object of type 'SecretEnvSource' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SecretEnvSource(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SecretEnvSource = toJson_SecretEnvSource;
/**
 * Converts an object of type 'LifecycleHandler' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_LifecycleHandler(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        exec: toJson_ExecAction(obj.exec),
        httpGet: toJson_HttpGetAction(obj.httpGet),
        tcpSocket: toJson_TcpSocketAction(obj.tcpSocket)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_LifecycleHandler = toJson_LifecycleHandler;
/**
 * Converts an object of type 'ExecAction' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ExecAction(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        command: obj.command?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ExecAction = toJson_ExecAction;
/**
 * Converts an object of type 'GrpcAction' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GrpcAction(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        port: obj.port,
        service: obj.service
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GrpcAction = toJson_GrpcAction;
/**
 * Converts an object of type 'HttpGetAction' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HttpGetAction(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        host: obj.host,
        httpHeaders: obj.httpHeaders?.map(y => toJson_HttpHeader(y)),
        path: obj.path,
        port: obj.port?.value,
        scheme: obj.scheme
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HttpGetAction = toJson_HttpGetAction;
/**
 * Converts an object of type 'TcpSocketAction' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_TcpSocketAction(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        host: obj.host,
        port: obj.port?.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_TcpSocketAction = toJson_TcpSocketAction;
/**
 * Converts an object of type 'Capabilities' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_Capabilities(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        add: obj.add?.map(y => y),
        drop: obj.drop?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_Capabilities = toJson_Capabilities;
/**
 * Converts an object of type 'KeyToPath' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_KeyToPath(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        key: obj.key,
        mode: obj.mode,
        path: obj.path
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_KeyToPath = toJson_KeyToPath;
/**
 * Converts an object of type 'DownwardApiVolumeFile' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DownwardApiVolumeFile(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        fieldRef: toJson_ObjectFieldSelector(obj.fieldRef),
        mode: obj.mode,
        path: obj.path,
        resourceFieldRef: toJson_ResourceFieldSelector(obj.resourceFieldRef)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DownwardApiVolumeFile = toJson_DownwardApiVolumeFile;
/**
 * Converts an object of type 'PersistentVolumeClaimTemplate' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_PersistentVolumeClaimTemplate(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: toJson_ObjectMeta(obj.metadata),
        spec: toJson_PersistentVolumeClaimSpec(obj.spec)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_PersistentVolumeClaimTemplate = toJson_PersistentVolumeClaimTemplate;
/**
 * Converts an object of type 'VolumeProjection' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_VolumeProjection(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        configMap: toJson_ConfigMapProjection(obj.configMap),
        downwardAPI: toJson_DownwardApiProjection(obj.downwardApi),
        secret: toJson_SecretProjection(obj.secret),
        serviceAccountToken: toJson_ServiceAccountTokenProjection(obj.serviceAccountToken)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_VolumeProjection = toJson_VolumeProjection;
/**
 * Converts an object of type 'GroupSubjectV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GroupSubjectV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GroupSubjectV1Beta1 = toJson_GroupSubjectV1Beta1;
/**
 * Converts an object of type 'ServiceAccountSubjectV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServiceAccountSubjectV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        namespace: obj.namespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServiceAccountSubjectV1Beta1 = toJson_ServiceAccountSubjectV1Beta1;
/**
 * Converts an object of type 'UserSubjectV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_UserSubjectV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_UserSubjectV1Beta1 = toJson_UserSubjectV1Beta1;
/**
 * Converts an object of type 'QueuingConfigurationV1Beta1' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_QueuingConfigurationV1Beta1(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        handSize: obj.handSize,
        queueLengthLimit: obj.queueLengthLimit,
        queues: obj.queues
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_QueuingConfigurationV1Beta1 = toJson_QueuingConfigurationV1Beta1;
/**
 * Converts an object of type 'GroupSubjectV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_GroupSubjectV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_GroupSubjectV1Beta2 = toJson_GroupSubjectV1Beta2;
/**
 * Converts an object of type 'ServiceAccountSubjectV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServiceAccountSubjectV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        namespace: obj.namespace
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServiceAccountSubjectV1Beta2 = toJson_ServiceAccountSubjectV1Beta2;
/**
 * Converts an object of type 'UserSubjectV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_UserSubjectV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_UserSubjectV1Beta2 = toJson_UserSubjectV1Beta2;
/**
 * Converts an object of type 'QueuingConfigurationV1Beta2' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_QueuingConfigurationV1Beta2(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        handSize: obj.handSize,
        queueLengthLimit: obj.queueLengthLimit,
        queues: obj.queues
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_QueuingConfigurationV1Beta2 = toJson_QueuingConfigurationV1Beta2;
/**
 * Converts an object of type 'ServiceBackendPort' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServiceBackendPort(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        number: obj.number
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServiceBackendPort = toJson_ServiceBackendPort;
/**
 * Converts an object of type 'HttpIngressPath' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HttpIngressPath(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        backend: toJson_IngressBackend(obj.backend),
        path: obj.path,
        pathType: obj.pathType
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HttpIngressPath = toJson_HttpIngressPath;
/**
 * Converts an object of type 'IpBlock' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_IpBlock(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        cidr: obj.cidr,
        except: obj.except?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_IpBlock = toJson_IpBlock;
/**
 * Converts an object of type 'NodeSelectorRequirement' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_NodeSelectorRequirement(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        key: obj.key,
        operator: obj.operator,
        values: obj.values?.map(y => y)
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_NodeSelectorRequirement = toJson_NodeSelectorRequirement;
/**
 * Converts an object of type 'JsonSchemaProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_JsonSchemaProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        $ref: obj.ref,
        $schema: obj.schema,
        additionalItems: obj.additionalItems,
        additionalProperties: obj.additionalProperties,
        allOf: obj.allOf?.map(y => toJson_JsonSchemaProps(y)),
        anyOf: obj.anyOf?.map(y => toJson_JsonSchemaProps(y)),
        default: obj.default,
        definitions: obj.definitions === undefined
            ? undefined
            : Object.entries(obj.definitions).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: toJson_JsonSchemaProps(i[1]) }), {}),
        dependencies: obj.dependencies === undefined ? undefined : Object.entries(obj.dependencies).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {}),
        description: obj.description,
        enum: obj.enum?.map(y => y),
        example: obj.example,
        exclusiveMaximum: obj.exclusiveMaximum,
        exclusiveMinimum: obj.exclusiveMinimum,
        externalDocs: toJson_ExternalDocumentation(obj.externalDocs),
        format: obj.format,
        id: obj.id,
        items: obj.items,
        maxItems: obj.maxItems,
        maxLength: obj.maxLength,
        maxProperties: obj.maxProperties,
        maximum: obj.maximum,
        minItems: obj.minItems,
        minLength: obj.minLength,
        minProperties: obj.minProperties,
        minimum: obj.minimum,
        multipleOf: obj.multipleOf,
        not: toJson_JsonSchemaProps(obj.not),
        nullable: obj.nullable,
        oneOf: obj.oneOf?.map(y => toJson_JsonSchemaProps(y)),
        pattern: obj.pattern,
        patternProperties: obj.patternProperties === undefined
            ? undefined
            : Object.entries(obj.patternProperties).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: toJson_JsonSchemaProps(i[1]) }), {}),
        properties: obj.properties === undefined
            ? undefined
            : Object.entries(obj.properties).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: toJson_JsonSchemaProps(i[1]) }), {}),
        required: obj.required?.map(y => y),
        title: obj.title,
        type: obj.type,
        uniqueItems: obj.uniqueItems,
        'x-kubernetes-embedded-resource': obj.xKubernetesEmbeddedResource,
        'x-kubernetes-int-or-string': obj.xKubernetesIntOrString,
        'x-kubernetes-list-map-keys': obj.xKubernetesListMapKeys?.map(y => y),
        'x-kubernetes-list-type': obj.xKubernetesListType,
        'x-kubernetes-map-type': obj.xKubernetesMapType,
        'x-kubernetes-preserve-unknown-fields': obj.xKubernetesPreserveUnknownFields,
        'x-kubernetes-validations': obj.xKubernetesValidations?.map(y => toJson_ValidationRule(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_JsonSchemaProps = toJson_JsonSchemaProps;
/**
 * Converts an object of type 'CustomResourceSubresourceScale' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_CustomResourceSubresourceScale(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        labelSelectorPath: obj.labelSelectorPath,
        specReplicasPath: obj.specReplicasPath,
        statusReplicasPath: obj.statusReplicasPath
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_CustomResourceSubresourceScale = toJson_CustomResourceSubresourceScale;
/**
 * Converts an object of type 'ConfigMapKeySelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ConfigMapKeySelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        key: obj.key,
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ConfigMapKeySelector = toJson_ConfigMapKeySelector;
/**
 * Converts an object of type 'ObjectFieldSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ObjectFieldSelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        apiVersion: obj.apiVersion,
        fieldPath: obj.fieldPath
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ObjectFieldSelector = toJson_ObjectFieldSelector;
/**
 * Converts an object of type 'ResourceFieldSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ResourceFieldSelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        containerName: obj.containerName,
        divisor: obj.divisor?.value,
        resource: obj.resource
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ResourceFieldSelector = toJson_ResourceFieldSelector;
/**
 * Converts an object of type 'SecretKeySelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SecretKeySelector(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        key: obj.key,
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SecretKeySelector = toJson_SecretKeySelector;
/**
 * Converts an object of type 'HttpHeader' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_HttpHeader(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
        value: obj.value
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_HttpHeader = toJson_HttpHeader;
/**
 * Converts an object of type 'ConfigMapProjection' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ConfigMapProjection(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        items: obj.items?.map(y => toJson_KeyToPath(y)),
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ConfigMapProjection = toJson_ConfigMapProjection;
/**
 * Converts an object of type 'DownwardApiProjection' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_DownwardApiProjection(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        items: obj.items?.map(y => toJson_DownwardApiVolumeFile(y))
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_DownwardApiProjection = toJson_DownwardApiProjection;
/**
 * Converts an object of type 'SecretProjection' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_SecretProjection(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        items: obj.items?.map(y => toJson_KeyToPath(y)),
        name: obj.name,
        optional: obj.optional
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_SecretProjection = toJson_SecretProjection;
/**
 * Converts an object of type 'ServiceAccountTokenProjection' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ServiceAccountTokenProjection(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        audience: obj.audience,
        expirationSeconds: obj.expirationSeconds,
        path: obj.path
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ServiceAccountTokenProjection = toJson_ServiceAccountTokenProjection;
/**
 * Converts an object of type 'ExternalDocumentation' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ExternalDocumentation(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        description: obj.description,
        url: obj.url
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ExternalDocumentation = toJson_ExternalDocumentation;
/**
 * Converts an object of type 'ValidationRule' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
function toJson_ValidationRule(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        message: obj.message,
        rule: obj.rule
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
exports.toJson_ValidationRule = toJson_ValidationRule;
/* eslint-enable max-len, quote-props */
//# sourceMappingURL=k8s.js.map